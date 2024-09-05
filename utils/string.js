import CryptoJS from "crypto-js";

export const stringToSlug = (str) => {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i= 0, l=from.length ; i < l ; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
};

const key = process.env.NEXT_PUBLIC_URL_ENCRYPT_KEY;
const iv = CryptoJS.enc.Hex.parse("7781157e2629b094f0e3dd48c4d786115");

const config = {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
};

export const rewriteUrl = ({ dataPassQuery, configUrl = {} }) => {
    const { unitTestId } = dataPassQuery;
    const { redirect = "/exercise/" } = configUrl;
    if (!unitTestId) {
        return "/";
    }
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(dataPassQuery), key, config).toString(
        CryptoJS.format.OpenSSL,
    );
    return redirect + btoa(encrypted);
};

export function hashSecureToken(message, secretKey, algorithm = "SHA256") {
    try {
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo[algorithm], secretKey);
        hmac.update(message);
        const hash = hmac.finalize();
        return CryptoJS.enc.Hex.stringify(hash);
    } catch (e) {
        console.error("Create hmac fail: ", e.message);
        return null;
    }
}
