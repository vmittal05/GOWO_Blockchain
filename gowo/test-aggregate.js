const bls = require('bls-lib');
bls.onModuleInit(() => {
    bls.init()
  
    const sec = bls.secretKey()
    console.log(sec);
    const pub = bls.publicKey()
    console.log(pub);
    const sig = bls.signature()
    console.log(sig);

    bls.secretKeySetByCSPRNG(sec)
    const msg = 'hello world'
    bls.sign(sig, sec, msg)
  
    bls.getPublicKey(pub, sec)
  
    const v = bls.verify(sig, pub, msg)
    console.log(v)
  
    bls.free(sec)
    bls.free(sig)
    bls.free(pub)
  })