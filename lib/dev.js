'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abi_bin_to_json = exports.privateToPublic = exports.randomKey = undefined;

var _index2 = require('./index.js');

var _index3 = _interopRequireDefault(_index2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Codex = _index3.default;
var httpEndpoint = 'http://118.31.2.69:10002';
var chainId = '313476bd983a454d51b83ea56cc6bc4c51fd87bc27acd20a3bd43a35e9da6648';
var node_config = { httpEndpoint: httpEndpoint, chainId: chainId };
var keyProvider = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
var eos = (0, _index3.default)(node_config);

var max_num = 50000000;

var API = {
  get_table_rows: '/v1/chain/get_table_rows'
};

var getTable = function getTable(httpEndpoint) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
      var concel_container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { cancel: [] };
      var CancelToken, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              CancelToken = _axios2.default.CancelToken;
              _context.next = 3;
              return _axios2.default.post(httpEndpoint + API.get_table_rows, params, {
                cancelToken: new CancelToken(function executor(c) {
                  concel_container.cancel.push(c);
                })
              }).then(function (data) {
                return data.data;
              }).catch(function (err) {
                return [];
              });

            case 3:
              data = _context.sent;
              return _context.abrupt('return', data);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var get_token_reward = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token_id) {
    var params, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = {
              code: 'relay.token',
              scope: token_id,
              table: 'minereward',
              limit: 10000,
              json: true
            };

            console.log(params);
            _context2.next = 4;
            return getTable(httpEndpoint)(params);

          case 4:
            data = _context2.sent;


            data.reward_scope = token_id;
            return _context2.abrupt('return', data);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function get_token_reward(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var get_account_accounts = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var account_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'eosforce';
    var params, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //  relay.token eosforce accounts
            params = {
              code: 'relay.token',
              scope: account_name,
              table: 'accounts',
              limit: 10000,
              json: true
            };

            console.log(params);
            _context3.next = 4;
            return getTable(httpEndpoint)(params);

          case 4:
            data = _context3.sent;
            return _context3.abrupt('return', data);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function get_account_accounts() {
    return _ref3.apply(this, arguments);
  };
}();

var ox_to_decimal = function ox_to_decimal(ox_str) {
  ox_str = ox_str.replace('0x', '');
  var ox_str_arr = ox_str.split('');

  var res = '',
      res_arr = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ox_str_arr.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _index = _step.value;

      if (_index % 2 == 0) continue;
      var ch = ox_str_arr[_index - 1] + ox_str_arr[_index];
      res += ch;
      res_arr.push(ch);
      var left_str = [].concat(_toConsumableArray(new Array(ox_str_arr.length - _index - 1))).map(function (i) {
        return '0';
      }).join('');
      if (res + left_str == ox_str) {
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  res_arr.reverse();
  return ('0x' + res_arr.join('')) * 1;
};

var test_cal_token_reward = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var account_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'eosforce';
    var stat_params, token_list, token_scope, token_reward_promise, token_reward_table, accounts_promise, account_data, mineage_update_height;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            stat_params = {
              code: 'relay.token',
              scope: account_name,
              table: 'stat',
              json: true,
              limit: 1000
            };
            _context4.next = 3;
            return Codex({ httpEndpoint: httpEndpoint }).getTableRows(stat_params);

          case 3:
            token_list = _context4.sent;
            token_scope = token_list.rows.filter(function (row) {
              return row.reward_scope < max_num;
            }).map(function (item) {
              return item.reward_scope;
            });
            token_reward_promise = [];

            // console.log(token_scope);

            token_scope.forEach(function (item) {
              // console.log(item);
              token_reward_promise.push(get_token_reward(item));
            });

            _context4.next = 9;
            return Promise.all(token_reward_promise);

          case 9:
            token_reward_table = _context4.sent;

            // console.log( token_reward_table );

            // 
            accounts_promise = [];
            _context4.next = 13;
            return get_account_accounts(account_name);

          case 13:
            account_data = _context4.sent;
            mineage_update_height = account_data.mineage_update_height;


            token_list.rows.forEach(function (token_item) {
              token_item.chain_key = token_item.chain + '_' + token_item.supply.split(' ')[1];
              var reward_table = token_reward_table.find(function (item) {
                return item.reward_scope == token_item.reward_scope;
              });
              if (!reward_table) return;
              token_item.reward_mine = reward_table || [];
            });

            account_data.rows.forEach(function (my_token) {
              my_token.chain_key = my_token.chain + '_' + my_token.balance.split(' ')[1];
              var my_reward_token = token_list.rows.find(function (i) {
                return i.chain_key == my_token.chain_key;
              });

              var mineage_update_height = my_token.mineage_update_height,
                  reward = my_token.reward,
                  balance = my_token.balance,
                  mineage = my_token.mineage;


              mineage = ox_to_decimal(mineage);
              balance = parseFloat(balance);
              reward = parseFloat(reward);
              mineage_update_height = parseFloat(mineage_update_height);

              my_reward_token.reward_mine.rows.forEach(function (reward_record_row) {
                var reward_block_num = reward_record_row.reward_block_num,
                    reward_pool = reward_record_row.reward_pool,
                    total_mineage = reward_record_row.total_mineage;


                reward_pool = parseFloat(reward_pool);
                total_mineage = ox_to_decimal(total_mineage);
                var st_total_mineage = total_mineage;
                total_mineage = parseFloat(total_mineage);

                if (reward_block_num > mineage_update_height) {

                  var today_mineage = (reward_block_num - mineage_update_height) * balance + mineage;
                  var today_reward = reward_pool * today_mineage / total_mineage;
                  reward = reward + today_reward;
                  mineage = 0;
                  mineage_update_height = reward_block_num;
                } else {
                  return;
                }
              });
              console.log('reward is ' + reward);
            });
            // 

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function test_cal_token_reward() {
    return _ref4.apply(this, arguments);
  };
}();

// test_cal_token_reward();

var _Eos$modules = _index3.default.modules,
    ecc = _Eos$modules.ecc,
    Fcbuffer = _Eos$modules.Fcbuffer;

// 返回随机私钥

var randomKey = exports.randomKey = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var private_key;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return ecc.randomKey();

          case 2:
            private_key = _context5.sent;

            console.log(private_key);
            return _context5.abrupt('return', private_key);

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function randomKey() {
    return _ref5.apply(this, arguments);
  };
}();

randomKey();

// 私钥转公钥
var privateToPublic = exports.privateToPublic = function privateToPublic(private_key) {
  var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EOS';

  var public_key = ecc.privateToPublic(private_key);
  console.log(public_key);
  return public_key.replace(/^EOS/, symbol);
};

privateToPublic('5KheBVK6zXFXszsSdBWJDScemsr1kAhe5mzszjKnWuarh5SH8vV');

// 

var create_account = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var creator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'eosforce';
    var accountName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'eosui';
    var permission = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'active';
    var config, token, random_key, public_key, auth;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            config = {
              httpEndpoint: httpEndpoint,
              keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
              chainId: chainId
            };
            _context6.next = 3;
            return (0, _index3.default)(config).contract('codex');

          case 3:
            token = _context6.sent;
            _context6.next = 6;
            return randomKey();

          case 6:
            random_key = _context6.sent;
            _context6.next = 9;
            return privateToPublic(random_key, '');

          case 9:
            public_key = _context6.sent;

            console.log('random private key ' + random_key + ', ' + public_key);
            accountName = accountName || 'dksdsd';
            // let auth = {permission: `active`, actor: creator}
            auth = { "actor": creator, "permission": 'active'
              // let auth = {actor: creator, permission: 'active'}
              // {actor: name, permission} : {authorization: `${name}@${permission}`}
            };
            console.log(auth);
            _context6.next = 16;
            return token.newaccount(creator, accountName, public_key, public_key, auth);

          case 16:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function create_account() {
    return _ref6.apply(this, arguments);
  };
}();

var test_contract_struct = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(contract) {
    var token, buf, buf_res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _index3.default)(node_config).contract('codex');

          case 2:
            token = _context7.sent;

            console.log(token.fc.structs);
            buf = void 0, buf_res = void 0;
            _context7.prev = 5;

            buf = Buffer.from(data, 'hex');
            buf_res = Fcbuffer.fromBuffer(eos_base_struct[action_name], buf);
            console.log(buf_res);
            _context7.next = 16;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7['catch'](5);

            console.log(_context7.t0, 'abi_bin_to_json_waste_time_is_00');
            resolve('');
            return _context7.abrupt('return');

          case 16:
            console.log(buf_res);

          case 17:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[5, 11]]);
  }));

  return function test_contract_struct(_x10) {
    return _ref7.apply(this, arguments);
  };
}();
// test_contract_struct();

var abi_bin_to_json = exports.abi_bin_to_json = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(data, contract_name, action_name) {
    var token, struct, buf, buf_res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _index3.default)(node_config).contract(contract_name);

          case 2:
            token = _context8.sent;
            struct = token.fc.structs;
            buf = void 0, buf_res = void 0;

            try {
              buf = Buffer.from(data, 'hex');
              buf_res = Fcbuffer.fromBuffer(struct[action_name], buf);
              console.log(buf_res);
            } catch (e) {
              console.log(e, 'abi_bin_to_json_waste_time_is_00');
            }

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function abi_bin_to_json(_x11, _x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

// abi_bin_to_json('0000000a5dba3055000000a09eae1234102700000000000004414444000000000a66726f6d20636861696e', 'relay.token', 'issue')


var test_get_info = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var info;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log(node_config);
            _context9.next = 3;
            return Codex(node_config).getInfo({});

          case 3:
            info = _context9.sent;
            //api getInfo
            console.log('node info is ' + JSON.stringify(info));

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function test_get_info() {
    return _ref9.apply(this, arguments);
  };
}();
// test_get_info();

var test_get_block = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var info;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            console.log(node_config);
            _context10.next = 3;
            return Codex(node_config).getBlock(100);

          case 3:
            info = _context10.sent;
            //api getInfo
            console.log('node info is ' + JSON.stringify(info));

          case 5:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function test_get_block() {
    return _ref10.apply(this, arguments);
  };
}();
// test_get_block();


var test_get_account = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var account_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'codex';
    var info;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return Codex(node_config).getAccount(account_name);

          case 2:
            info = _context11.sent;

            console.log('account info is ' + JSON.stringify(info));

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function test_get_account() {
    return _ref11.apply(this, arguments);
  };
}();
// test_get_account();

var test_get_available = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var account_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'testc';
    var params, account_info;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            params = {
              scope: account_name,
              code: 'codex.token',
              table: 'accounts',
              limit: 10000,
              json: true
            };
            _context12.next = 3;
            return Codex(node_config).getTableRows(params);

          case 3:
            account_info = _context12.sent;

            console.log(account_info);

          case 5:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function test_get_available() {
    return _ref12.apply(this, arguments);
  };
}();
// test_get_available();


var test_get_bps_table = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var account_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'testc';
    var params, account_info;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            params = {
              scope: 'codex',
              code: 'codex',
              table: 'bps',
              json: true,
              limit: 1000
            };
            _context13.next = 3;
            return Codex(node_config).getTableRows(params);

          case 3:
            account_info = _context13.sent;

            console.log(account_info);

          case 5:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function test_get_bps_table() {
    return _ref13.apply(this, arguments);
  };
}();
// test_get_bps_table();


var test_get_super_bps_table = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'codex';
    var params, supber_bps;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            params = {
              scope: code,
              code: code,
              table: 'schedules',
              table_key: '0',
              json: 'true',
              limit: 1000
            };
            _context14.next = 3;
            return Codex(node_config).getTableRows(params);

          case 3:
            supber_bps = _context14.sent;

            console.log(supber_bps);

          case 5:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function test_get_super_bps_table() {
    return _ref14.apply(this, arguments);
  };
}();
// test_get_super_bps_table();


var test_get_block_productor = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var codex_token, node_info, head_block_num, head_block_info, schedule_version, params, supber_bps;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return Codex(node_config);

          case 2:
            codex_token = _context15.sent;
            _context15.next = 5;
            return codex_token.getInfo({});

          case 5:
            node_info = _context15.sent;
            head_block_num = node_info.head_block_num; //节点最新区块编号

            head_block_info = codex_token.getBlock(head_block_num); //最新区块详细信息

            schedule_version = head_block_info.schedule_version; //区块所在届

            params = {
              scope: 'codex',
              code: 'codex',
              table: 'schedules',
              table_key: '0',
              json: 'true',
              limit: 1000
            };
            _context15.next = 12;
            return Codex(node_config).getTableRows(params);

          case 12:
            supber_bps = _context15.sent;

            console.log(supber_bps);

          case 14:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function test_get_block_productor() {
    return _ref15.apply(this, arguments);
  };
}();
// test_get_block_productor();

var test_freeze = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(your_private_key, voter, freeze_ammount) {
    var private_config, codex_token, res;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            private_config = Object.assign({ keyProvider: your_private_key }, node_config);
            _context16.next = 3;
            return Codex(private_config).contract('codex');

          case 3:
            codex_token = _context16.sent;
            _context16.next = 6;
            return codex_token.freeze(voter, freeze_ammount);

          case 6:
            res = _context16.sent;

            console.log(res);

          case 8:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function test_freeze(_x18, _x19, _x20) {
    return _ref16.apply(this, arguments);
  };
}();

// test_freeze( keyProvider,'testc', '11112.0000 CDX')
/*

{
      "name": "chain",
      "type": "name"
  },
  {
      "name": "quantity",
      "type": "asset"
  },
  {
      "name": "receiver",
      "type": "account_name"
  }

*/
var test_claim_token_share = function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(your_private_key, chain) {
    var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0.0000 ADD';
    var receiver = arguments[3];
    var private_config, codex_token;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            private_config = Object.assign({ keyProvider: your_private_key }, node_config);
            _context17.next = 3;
            return Codex(private_config);

          case 3:
            codex_token = _context17.sent;
            _context17.next = 6;
            return codex_token.transaction(['relay.token', 'codex.token'], function (contracts) {
              contracts.codex_token.opencast(receiver);
              contracts.relay_token.claim(chain, quantity, receiver, { 'actor': receiver, 'permission': 'active' });
            });

          case 6:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function test_claim_token_share(_x21, _x22) {
    return _ref17.apply(this, arguments);
  };
}();

test_claim_token_share(keyProvider, 'eosforce', '0.0000 ADD', 'testc');

var test_claim_vote_share = function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(your_private_key, voter, bpname) {
    var private_config, codex_token;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            private_config = Object.assign({ keyProvider: your_private_key }, node_config);
            _context18.next = 3;
            return Codex(private_config);

          case 3:
            codex_token = _context18.sent;
            _context18.next = 6;
            return codex_token.transaction(['codex', 'codex.token'], function (contracts) {
              contracts.codex_token.opencast(voter);
              contracts.codex.claimvote(bpname, voter, { 'actor': voter, 'permission': 'active' });
            });

          case 6:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function test_claim_vote_share(_x24, _x25, _x26) {
    return _ref18.apply(this, arguments);
  };
}();

// test_claim_vote_share(keyProvider, 'eosforce', 'fb1');

var test_get_accounts_by_key = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(public_key) {
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            Codex({ httpEndpoint: httpEndpoint }).getKeyAccounts(public_key).then(function (data) {
              console.log(data);
            });

          case 1:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  }));

  return function test_get_accounts_by_key(_x27) {
    return _ref19.apply(this, arguments);
  };
}();

// test_get_accounts_by_key('CDX6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV')

var get_abi = function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
    var abi_content;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return Codex({ httpEndpoint: httpEndpoint }).getAbi('codex');

          case 2:
            abi_content = _context20.sent;

            console.log(abi_content);

          case 4:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  }));

  return function get_abi() {
    return _ref20.apply(this, arguments);
  };
}();
// get_abi();

var main = function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  }));

  return function main() {
    return _ref21.apply(this, arguments);
  };
}();

main();
/*
EOS_ML(test_config).getTableRows({
      scope: 'eosio',
      code: 'eosio',
      table: 'freezed',
      json: true,
      limit: 1,
      // table_key: test_account_name
      lower_bound : test_account_name
  });
*/