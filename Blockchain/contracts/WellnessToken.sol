// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract WellnessToken is ERC20, AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    
    // Activity reward amounts
    uint256 public constant MEDITATION_STREAK_REWARD = 10 * 10**18; // 10 tokens
    uint256 public constant STEPS_REWARD = 5 * 10**18; // 5 tokens per 1000 steps
    
    // Anti-cheat measures
    mapping(address => uint256) public lastActivityTimestamp;
    mapping(address => uint256) public activityCount;
    uint256 public constant ACTIVITY_COOLDOWN = 1 days;
    uint256 public constant MAX_ACTIVITIES_PER_DAY = 10;
    
    // Events
    event TokensMinted(address indexed user, uint256 amount, string activityType);
    event TokensBurned(address indexed user, uint256 amount, string rewardType);
    event ActivityValidated(address indexed user, string activityType, uint256 timestamp);
    
    constructor() ERC20("WellnessToken", "WELL") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(VALIDATOR_ROLE, msg.sender);
    }
    
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "WellnessToken: admin role required");
        _;
    }
    
    modifier onlyValidator() {
        require(hasRole(VALIDATOR_ROLE, msg.sender), "WellnessToken: validator role required");
        _;
    }
    
    modifier checkActivityLimit() {
        require(
            block.timestamp >= lastActivityTimestamp[msg.sender] + ACTIVITY_COOLDOWN,
            "WellnessToken: activity cooldown period not elapsed"
        );
        require(
            activityCount[msg.sender] < MAX_ACTIVITIES_PER_DAY,
            "WellnessToken: daily activity limit reached"
        );
        _;
    }
    
    function pause() external onlyAdmin {
        _pause();
    }
    
    function unpause() external onlyAdmin {
        _unpause();
    }
    
    function validateAndRewardActivity(
        address user,
        string memory activityType,
        uint256 activityValue
    ) external onlyValidator whenNotPaused nonReentrant {
        require(user != address(0), "WellnessToken: invalid user address");
        
        uint256 rewardAmount = 0;
        
        if (keccak256(bytes(activityType)) == keccak256(bytes("meditation_streak"))) {
            require(activityValue >= 7, "WellnessToken: meditation streak must be at least 7 days");
            rewardAmount = MEDITATION_STREAK_REWARD;
        } else if (keccak256(bytes(activityType)) == keccak256(bytes("steps"))) {
            require(activityValue >= 1000, "WellnessToken: minimum 1000 steps required");
            rewardAmount = (activityValue / 1000) * STEPS_REWARD;
        }
        
        require(rewardAmount > 0, "WellnessToken: invalid activity type or value");
        
        lastActivityTimestamp[user] = block.timestamp;
        activityCount[user]++;
        
        _mint(user, rewardAmount);
        emit TokensMinted(user, rewardAmount, activityType);
        emit ActivityValidated(user, activityType, block.timestamp);
    }
    
    function burnForReward(uint256 amount, string memory rewardType) external whenNotPaused nonReentrant {
        require(amount > 0, "WellnessToken: amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "WellnessToken: insufficient balance");
        
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount, rewardType);
    }
    
    function resetDailyActivityCount() external onlyAdmin {
        activityCount[msg.sender] = 0;
    }
    
    function addValidator(address validator) external onlyAdmin {
        grantRole(VALIDATOR_ROLE, validator);
    }
    
    function removeValidator(address validator) external onlyAdmin {
        revokeRole(VALIDATOR_ROLE, validator);
    }
} 