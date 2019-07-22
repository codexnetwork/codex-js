## codex API

### Install
```javascript
npm install cdxjs
    //or
yarn add cdxjs
```
### Usage
```javascript
import Codex from 'cdxjs'
```
## 
### Config

parameters:

- httpEndPoint [string] codex chain rpc base host
- chainId [string] the id of codex chain, you can get by [get_info](#get_info)
- keyProvider

Example:

```javascript
const node_config = {
  httpEndpoint: node_url,
  chainId,
  keyProvider
}
```

### getAbi

ABI instruction all the methods that in contract.

parameters:

- contract_name [string] 


Example:

```javascript
const test_get_abi = async () => {
  let abi_content = await Codex({httpEndpoint}).getAbi('codex');
  console.log(abi_content.abi.actions);
}
test_get_abi();
```
### getInfo

get the chain info

parameters:

- empty_dict [Object] the empy object is neccessary.


Example:

```javascript
const test_get_info = async () => {
  let info = await Codex(node_config).getInfo({}); //api getInfo, `{}` is required
  console.log(`node info is ${JSON.stringify(info)}`);
}
test_get_info();
```

### getBblock

get block info with block num or block id

参数:

- block_num_or_id [string]

Example:

```javascript
    const test_get_block = async (block_num_or_id = 10) => {
      let block_info = await Codex(node_config).getBlock(block_num_or_id); //api getBlock
      console.log(`block info is ${JSON.stringify(block_info)}`);
    }
    test_get_block();
```


# getAccount  

cpu, net, ram, public key can be goted by this api

parameters:

- account_name [string]

Example:

```javascript
const test_get_account = async (account_name = 'codex') => {
  let info = await Codex(node_config).getAccount(account_name); 
  console.log(`account info is ${JSON.stringify(info)}`);
}
test_get_account();
```


### getTableRows

query contract table

参数:

- code [string] the account of contract
- table [string] table name
- scope [string] query condition
- limit [number] the max rows you want


### query an account's token

parameters:

```javascript
  { 
    scope: account_name, // the account you want query
    code: 'codex.token', 
    table: 'accounts', 
    limit: 10000,
    json: true,
  }
```


Example:

```javascript
const test_get_available = async (account_name = 'testc') => {
  let params = { 
    scope: account_name,
    code: 'codex.token',
    table: 'accounts', 
    limit: 10000,
    json: true,
  }
  let account_info = await Codex(node_config).getTableRows(params); // api getTableRows
  console.log(account_info)
}
test_get_available();
```


### query blcok producers

parammeters:

```javascript
  {
    scope: 'codex',
    code: 'codex',
    table: 'bps',
    json: true,
    limit: 1000 
  }
```

Example:

```javascript
const test_get_bps_table = async (account_name = 'testc') => {
  let params = {
      scope: 'codex',
      code: 'codex',
      table: 'bps',
      json: true,
      limit: 1000 
  }
  let account_info = await Codex(node_config).getTableRows(params);
  console.log(account_info)
}
test_get_bps_table();
```

### query the producers which pack block data

Example:
```javascript
const test_get_block_productor = async () => {
  let codex_token = await Codex(node_config);
  let node_info = await codex_token.getInfo({});

  let head_block_num = node_info.head_block_num; //block_num_or_id
  let head_block_info = await codex_token.getBlock(head_block_num); //the latest block info
  let schedule_version = head_block_info.schedule_version; //the version 
  let 参数 = {
      scope: 'codex',
      code: 'codex',
      table: 'schedules',
      table_key: '0',
      json: 'true',
      limit: 1000,
  }
  let supber_bps = await Codex(node_config).getTableRows(参数);
  console.log(supber_bps)
}

test_get_block_productor();
```


# 抵押

抵押将可用余额中的代币添加到抵押池;
投票，租赁内存将使用抵押池里的主币，所以投票或租赁内存前确保抵押池必须有主币。

合约账户: ‘codex’

函数: freeze

参数:
```javascript
    voer: 抵押给哪个账户
    stake: 抵押数量
```


使用示例:
```javascript
const test_freeze = async (your_private_key, voter, freeze_ammount) => {
  let private_config = Object.assign({keyProvider: your_private_key}, node_config);
  let codex_token = await Codex(private_config).contract('codex');
  let res = await codex_token.freeze(voter, freeze_ammount);
  console.log(res);
}

test_freeze( keyProvider,'testc', '11112.0000 CDX')
```


# 投票挖矿

投票给超级节点，若是所投节点为超级节点,将分享节点的出块奖励

合约账户: codex

函数: vote

参数:

```javascript
    voter: 为哪个账户投票
    bpname: 所投节点的名称
    stake: 投票数量
```

使用示例:

```javascript
// keyProvider 为私钥
const test_vote = async (voter, bpname, stake) => {
  let token = await Codex({keyProvider, httpEndpoint, chainId}).contract('codex');
  let res = await token.vote(voter, bpname, stake);
  console.log(res);
}
test_vote(voter, bpname, stake);
```

# 内存租赁

投票给出块节点，将增加内存

合约账户: codex

函数: vote4ram

参数:
```js
    voter: 租赁账户
    bpname: 节点名称
    stake: 投票数量(如 '10.0000 CDX')
```

使用示例:

```js
const test_vote4ram = async (voter, bpname, stake) => {
  let token = await Codex({keyProvider, httpEndpoint, chainId}).contract('codex');
  let data = await token.vote4ram(voter, bpname, stake);
  console.log(data);
}
test_vote4ram(voter, bpname, stake);
```

# 转账

合约账户: codex.token

函数: transfer

参数: 
```js
    from: 转出账户
    to: 转入账户
    quantity: 转账数量
    memo: 转账备注信息，非必填，没有使用空字符串
```
使用示例:

```javascript
const test_transfer = async (from, to, quantity = '0.0000 CDX', memo = '') => {
  let token = await Codex({keyProvider, httpEndpoint, chainId}).contract('codex.token');
  let res = await token.transfer(from, to, quantity, memo);
  console.log(res);
}
test_transfer(from_name, to_name, quantity, memo);
```
# 领取投票分红

合约账户: codex

参数:
```js
    bpname: 从哪个节点领取分红
    receiver: 领取分红分配到哪个账户
```
::: 注意
领取投票分红必须在同一个块opencast
:::

使用示例:

```javascript
const test_claim_vote_share = async (your_private_key, voter, bpname) => {
  let private_config = Object.assign({keyProvider: your_private_key}, node_config);
  let codex_token = await Codex(private_config);

  // 领取分红前，需要调用 opencast 打开铸币池
  await codex_token.transaction(['codex', 'codex.token'], contracts => {
    contracts.codex_token.opencast(voter);
    contracts.codex.claimvote(bpname, voter, {'actor': voter, 'permission': 'active'}); 
  });

}

test_claim_vote_share(keyProvider, your_account_name, the_block_node_you_voted);
```

# 领取挖矿分红

合约账户: relay.token, codex.token

参数:

    chain: 代币所在链的名称
    quantity:  领取分红数量, 当前数量没有作用，主要识别代币符号, 可填 “0.0000 token_symbol”receiver: 领取分红的人


::: 注意
领取挖矿分红必须在同一个块opencast
:::

使用示例:
```javascript
const test_claim_token_share = async (your_private_key, chain, quantity = '0.0000 ADD', receiver) => {
  let private_config = Object.assign({keyProvider: your_private_key}, node_config);
  let codex_token = await Codex(private_config);

  // 领取分红前，需要调用 opencast 打开铸币池
  await codex_token.transaction(['relay.token', 'codex.token'], contracts => {
      contracts.codex_token.opencast(receiver);
      contracts.relay_token.claim( chain, quantity, receiver, {'actor': receiver, 'permission': 'active'});
  })

}

test_claim_token_share(keyProvider, 'eosforce', '0.0000 ADD', 'testc');
```
# 跨链充值


# 跨链提现


# 跨链资产转账

合约名称: relay.token

参数:

    from: 转出账户
    to: 转入账户
    chain: 链名称
    amount: 转账数量
    memo: 备注，可不填，不填输入空字符串
    

使用示例:

```javascript
    Codex({keyProvider, httpEndpoint, chainId})
    .contract('relay.token')
    .then(async token => {
      let res = token.transfer(from, to, chain, amount, memo);
      console.log( res );
    })
    .catch(err => {
      throw err;
    });
```

# 计算挖矿分红


# 计算投票分红

# 创建用户

合约账户:codex

函数: newaccount

参数: 

    creator: 创建者
    new_name: 被创建用户名
    active_public_key: active 权限所在 public key
    owner_public_key: owner 权限所在 public key

使用示例:

```javascript
const test_create_account = async (creator, name, public_key, public_key) => {
    let token = await Codex({keyProvider, httpEndpoint, chainId}).contract('codex');
    await token.newaccount(creator, name, public_key, public_key);
}
test_create_account(creator, name, public_key, public_key);
```

# 更改账户权限

合约账户:codex

参数: 

    name: 修改权限账户名
    perm_name: 需要修改的权限的名称
    parent_perm_name: 需要修改的权限的父权限, 若是acitve, 父权限为owner. 若是owner, 父权限为’’
    public_key: 将账户下的权限转移到当前公钥

使用示例:

```javascript
    Codex({keyProvider, httpEndpoint, chainId}).transaction(contract_account, tr => {
        tr.updateauth(name, 'active', 'owner', active_public_key, auth); //修改active 权限公钥
        tr.updateauth(name, 'owner', '', owner_public_key, auth);//修改owner 权限公钥
      })
```


# 获取交易记录

参数: 

    account_name: 查询当前账户的交易记录
    pos: 从哪条记录开始查询; 若是需要从最近开始查询，使用-1，offset 设为 负数， 若要查询更多，获取查询记录最后一条的 account_action_seq 作为pos
    offset: 查询的条怒


使用示例:
```javascript
    Codex({httpEndpoint}).getActions({
          account_name: accountName, 
          pos: pos, 
          offset: offset
    })
    .then(data => {
      console.log(data);
    });
```

# 解析交易记录中的data数据

参数:
```js
    data: 交易记录中action中的data字段，类似 "0000000a5dba3055000000c0d483a93ba0860100000000000443445800000000" 这类结构
    contract_name: data所在action的合约账户
    action_name: data所在action的合约方法
```

使用示例:

```js
const abi_bin_to_json = async (data, contract_name, action_name) => {
  let token = await Codex(node_config).contract(contract_name);
  let struct = token.fc.structs;

  let buf, buf_res;
  try{
      buf = Buffer.from(data, 'hex');
      buf_res = Fcbuffer.fromBuffer(struct[action_name], buf)
      console.log(buf_res);
  }catch(e){
    throw e;
  }
  return buf_res;
}
```

# 私钥生成

使用示例:
```javascript
    const { ecc, Fcbuffer } = Codex.modules;
    const randomKey = async () => {
        let private_key = await ecc.randomKey();
        console.log(private_key);
        return private_key;
    }
    randomKey();
```


# 公钥获取

使用示例:
```javascript
    const privateToPublic = (private_key) => {
        let public_key = ecc.privateToPublic(private_key);
        return public_key;
    }
    privateToPublic();
```


# 获取公钥下账户

参数: 

    public_key: 公钥

使用示例:

```javascript
    Codex({httpEndpoint}).getKeyAccounts(public_key).then(data => {
        console.log(data);
    })
```

