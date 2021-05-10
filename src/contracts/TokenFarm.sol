// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./MastiToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    // for test only
    string public name = "Masti Token Farm";

    // Init tokens
    MastiToken public mastiToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // get masti and dai token
    constructor(MastiToken _mastiToken, DaiToken _daiToken) public {
        mastiToken = _mastiToken;
        daiToken = _daiToken;
    }

    // Stake Tokens (Deposit)
    function stakeTokens(uint256 _amount) public {
        // Transfer mock dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update Staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only if haven't staked yet
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstake Tokens (Withdraw)
    // function unStakeTokens(uint256 _amount) public {}

    // Issuing Tokens (Earn Intrest)
    // function issueTokens(uint256 _amount) public {}
}
