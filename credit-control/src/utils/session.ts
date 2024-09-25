import CryptoJS from "crypto-js";

export const getCreatedUser = () => {
    const session = localStorage.getItem('badgeSession') || '';
    const decryptedSession = CryptoJS.AES.decrypt(session, "Tyrannosaurus");
    const created_user = decryptedSession.toString(CryptoJS.enc.Utf8);
    return created_user;
}