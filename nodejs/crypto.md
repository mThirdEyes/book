# crypto
`crypto` 是node的加密解密模块

使用 `require('crypto')`来访问&引入这个模块

`crypto` 模块为使用安全证书实现HTTPS 安全网络以及 HTTP 连接提供了支持。

模块同样为 OpenSSL 的 hash、hmac、cipher、decipher、sign 以及 verify 方法提供一层包装(以方便在 Node 中使用)。

## crypto.setEngine(engine[, flags])

> 加载和设置 部分/所有 的OpenSSL函数集引擎(由flags参数指定)。

engine 可以是一个id或者是链接引擎共享库的路径

flags 为可选参数 默认值为ENGINE_METHOD_ALL，它有下面的可选值

* ENGINE_METHOD_RSA
* ENGINE_METHOD_DSA
* ENGINE_METHOD_DH
* ENGINE_METHOD_RAND
* ENGINE_METHOD_ECDH
* ENGINE_METHOD_ECDSA
* ENGINE_METHOD_CIPHERS
* ENGINE_METHOD_DIGESTS
* ENGINE_METHOD_STORE
* ENGINE_METHOD_PKEY_METH
* ENGINE_METHOD_PKEY_ASN1_METH
* ENGINE_METHOD_ALL
* ENGINE_METHOD_NONE

## crypto.getCiphers()
> 返回一个与支持的密码名字的数组。

示例：
```javascript
var ciphers = crypto.getCiphers();
console.log(ciphers); // ['aes-128-cbc', 'aes-128-ccm', ...]
```

## crypto.getHashes()
> 返回一个支持哈希算法名字的数组。

示例：
```javascript
var hashes = crypto.getHashes();
console.log(hashes); // ['sha', 'sha1', 'sha1WithRSAEncryption', ...]
```

## crypto.getCurves()
> 返回一个支持椭圆曲线名称数组

示例：
```javascript
var curves = crypto.getCurves();
console.log(curves); // ['secp256k1', 'secp384r1', ...]
```

## crypto.createCredentials(details)
> 建立一个证书对象，参数 detail 是由键值对组成的字典。

* pfx : 一个字符串或缓存区，包含PFX或12编码的私钥，证书和CA证书
* key : 一个字符串，包含 PEM 编码的私钥
* passphrase : 一个私钥或pfx的密码串
* cert : 一个字符串，包含 PEM 编码的证书
* ca : 一个包含 PEM 编码的、可信任的数字中心认证证书的字符串或者字符串列表
* crl : 一个包含 PEM 编码的、证书撤销列表字符串或者字符串列表(Certificate Revocation List)
* ciphers: 一个描述密码使用或排除的字符串. 查看关于格式的细节： http://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT

如果参数details中没有'ca' ， 那么node.js将缺省使用下面网址提供的值：

http://mxr.mozilla.org/mozilla/source/security/nss/lib/ckfw/builtins/certdata.txt

## crypto.createHash(algorithm)
> 通过参数 algorithm 指定算法建立并且返回一个哈希对象，可以用来产生哈希摘要。

algorithm 参数依赖于 node 运行平台上 OpenSSL 所支持的有效算法。例如 sha1,md5,sha256,sha512等，在最近发
布的版本中, openssl list-message-digest-algorithms 将显示有效的算法摘要。

示例: 这个程序将展示为文件做sha1加密
```javascript
var filename = process.argv[2];
var crypto = require('crypto');
var fs = require('fs');

var shasum = crypto.createHash('sha1');

var s = fs.ReadStream(filename);
s.on('data', function(d) {
    shasum.update(d);
});

s.on('end', function() {
    var d = shasum.digest('hex');
    console.log(d + '  ' + filename);
});
```

## Class: Hash
> 创建散列(哈希)摘要数据的类。

It is a stream that is both readable and writable. The written data is used to compute the hash. Once the writable side of the stream is ended, use the read() method to get the computed hash digest. The update and digest methods are also supported.

### hash.update(data[, input_encoding])
> 根据给定的数据更新hash内容，它的编码参数input_encoding可为'utf8', 'ascii' or 'binary'，如果不提供编码值，并且输入是一个字符串，则编码强制为'binary'，如果data为Buffer，则input_encoding可忽略。

如果data是streamed，则可以被多次调用。

### hash.digest([encoding])
> 计算所有传递来数据的哈希摘要。编码可以是'hex','binary'或者'base64'。如果encoding参数不传递，则返回buffer。

注：哈希对象在digest()方法调用后不能被使用


## crypto.createHmac(algorithm, key)
> 通过指定算法(algorithm)和密钥(key)建立并返回一个加密的 hmac 对象。
和 createhash 函数一样，参数 algorithm 的选择依赖于 node 运行平台上 OpenSSL 所支持的有效算法，key 是要使
用的 HMAC 私钥。

## Class: Hmac
### hmac.update(data)
> 更新指定数据(参数 data)的 hmac 的内容，当以流的方式接收新数据(参数 data)时，可多次调用此方法。

### hmac.digest([encoding])
> 计算所有传递来数据的 hmac 摘要。编码可以是'hex','binary'或者'base64' 。

## crypto.createCipher(algorithm, password)
> 通过指定算法(algorithm)和密钥(key)建立并返回一个 cipher 对象

算法参数的内容依赖于 OPENSSL 所支持的有效算法，例如 aes192等等。OpenSSL 的 list-cipher-algorithms 将显
示有效的 cipher 算法。

## crypto.createCipheriv(algorithm, key, iv)
> 通过指定算法(algorithm)、密钥(key) 和iv 建立并返回一个 cipher 对象

## Class: Cipher
### cipher.update(data[, input_encoding][, output_encoding])
> 更新参数 data 所代表的 cipher，input_encodin 是初始数据的编码，编码可以是 'utf8','ascii'或者'binary'。

output_encoding 参数指定了加密数据的输出编码，编码可以是'binary','base64'或者'hex'。
返回加密后的内容，当以流的方式接收新数据时，可多次调用此方法。

### cipher.final([output_encoding])
> 返回剩余的已加密内容，output_eocoding 可以是'binary','ascii','utf8'中的一个。

### cipher.setAutoPadding(auto_padding=true)

### cipher.getAuthTag()

### cipher.setAAD(buffer)

## crypto.createDecipher(algorithm, password)
> 通过参数 algorithm 和 key 建立并返回一个 decipher 对象。这是前面 cipher 对象的一个镜像.

## crypto.createDecipheriv(algorithm, key, iv)
> 通过参数 algorithm、key和iv建立并返回一个 decipher 对象。这是前面 cipher 对象的一个镜像.

## Class: Decipher
### decipher.update(data[, input_encoding][, output_encoding])
> 更新参数 data 所代表的 decipher ，input_encoding 是初始数据的编码，编码可以是'binary','base64'或者'hex'。
output_encoding 参数指定了已解密的铭文的输出编码，编码可以是'binary','base64'或者'hext

### decipher.final([output_encoding])
> 返回其余解密后的文本。参数 output_encoding 是 'binary', 'ascii' or 'utf8'中的一个。

### decipher.setAutoPadding(auto_padding=true)
> 

### decipher.setAuthTag(buffer)

### decipher.setAAD(buffer)

## crypto.createSign(algorithm)
> 通过参数 algorithm 建立并返回一个 signing 对象。根据当前 openSSL 版本,penssl 的 list-public-key-algorithms 将
显示 singning 的有效算法.例如 'RSA-SHA256'。

## Class: Sign
### sign.update(data)
用参数 data 更新 signer 对象，当以流的方式接收新数据时，可多次调用此方法。

### sign.sign(private_key[, output_format])
> 计算所有 signer 里已经更新的数据的签名。private_key 是一个字符串，包含用于签名的 PEM 编码的私钥。
返回用 output_format 指定编码的签名，编码可以是'binary', 'hex' or 'base64'

## crypto.createVerify(algorithm)
> 通过指定 algorithm 建立并返回一个 verification 对象.这是上面 signing 对象的一个镜像。

## Class: Verify
### verifier.update(data)
> 用新数据(参数 data)更新 verifyer 对象，当以流的方式接收新数据时，可多次调用此方法。

### verifier.verify(object, signature[, signature_format])
> 用包含有 PEM 编码的公钥，即参数 public_key 来验证电子签名数据。参数 signature 是先前用此数据计算的签
名，参数 signature_format 可以是'binary', 'hex' or 'base64'.
根据签名和公钥对数据的验证结果返回 true 或 false。


## crypto.createDiffieHellman(prime_length[, generator])
## crypto.createDiffieHellman(prime[, prime_encoding][, generator][, generator_encoding])
## Class: DiffieHellman
### diffieHellman.verifyError
### diffieHellman.generateKeys([encoding])
### diffieHellman.computeSecret(other_public_key[, input_encoding][, output_encoding])
### diffieHellman.getPrime([encoding])
### diffieHellman.getGenerator([encoding])
### diffieHellman.getPublicKey([encoding])
### diffieHellman.getPrivateKey([encoding])
### diffieHellman.setPublicKey(public_key[, encoding])
### diffieHellman.setPrivateKey(private_key[, encoding])
## crypto.getDiffieHellman(group_name)
## crypto.createECDH(curve_name)
## Class: ECDH
### ECDH.generateKeys([encoding[, format]])
### ECDH.computeSecret(other_public_key[, input_encoding][, output_encoding])
### ECDH.getPublicKey([encoding[, format]])
### ECDH.getPrivateKey([encoding])
### ECDH.setPublicKey(public_key[, encoding])
### ECDH.setPrivateKey(private_key[, encoding])
## crypto.pbkdf2(password, salt, iterations, keylen[, digest], callback)
## crypto.pbkdf2Sync(password, salt, iterations, keylen[, digest])
## crypto.randomBytes(size[, callback])
## Class: Certificate
### Certificate.verifySpkac(spkac)
### Certificate.exportChallenge(spkac)
### Certificate.exportPublicKey(spkac)
## crypto.publicEncrypt(public_key, buffer)
## crypto.publicDecrypt(public_key, buffer)
## crypto.privateDecrypt(private_key, buffer)
## crypto.privateEncrypt(private_key, buffer)
## crypto.DEFAULT_ENCODING

## 示例

md5 加密函数
```javascript
var crypto = require('crypto');

var md5 = function(data){
    var hash = crypto.createHash('md5');
    var encoding = typeof data === 'string' ? 'utf8' : 'binary';
    hash.update(data, encoding);
    return md5sum.digest('hex');
}
```