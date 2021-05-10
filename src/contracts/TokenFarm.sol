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

    // get masti and dai token
    constructor(MastiToken _mastiToken, DaiToken _daiToken) public {
        mastiToken = _mastiToken;
        daiToken = _daiToken;
    }
}
