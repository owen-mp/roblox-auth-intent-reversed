let serverNonce = "nonce yes"
const It = {
    name: "ECDSA",
    namedCurve: "P-256"
}
const Bt = {
    name: "ECDSA",
    hash: {
        name: "SHA-256"
    }
}

function Ze(e) {
    for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++)
        t[n] = e.charCodeAt(n);
    return t.buffer
}

async function generatePrivateKey() {
    return await crypto.subtle.generateKey(It, !1, ["sign"])
}

async function getexportPublicKeyAsSpki(pub) {
    return await crypto.subtle.exportKey("spki", pub)
}

async function signSignature(privkey, data) {
    return await crypto.subtle.sign(Bt, privkey, Ze(data))
}

function et(e) {
    for (var t = "", n = new Uint8Array(e), r = 0; r < n.byteLength; r++)
        t += String.fromCharCode(n[r]);
    return btoa(t)
}

generatePrivateKey().then(privkey => {
    getexportPublicKeyAsSpki(privkey.publicKey).then(spkikey => {
        a = Math.floor(Date.now() / 1000)
        o = [spkikey, a, serverNonce].join("|")
        signSignature(privkey.privateKey, o).then(results => {
            console.log("saiSignature: " + et(results));
            console.log("clientPublicKey: " + et(spkikey));
            console.log("clientEpochTimestamp: " + String(a));
        }).catch(error => {
            console.log(error);
        })
    })
})
