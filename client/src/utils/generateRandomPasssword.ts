function generateRandomPassword(length = 12): string {
    const lowercase = 'abcdefghjkmnpqrstuvwxyz'; // Exclude 'i', 'l', 'o'
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude 'I', 'O'
    const numbers = '23456789'; // Exclude '0', '1'
    const allChars = lowercase + uppercase + numbers;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}

export default generateRandomPassword;
