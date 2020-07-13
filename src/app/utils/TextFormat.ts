class TextFormat {

    camelToUnderscore(key): string {
        if (/[A-Z]/.test(key) && !key.includes('_')) {
            const result = key.slice(1, key.length).replace(/([A-Z])/g, " $1");
            return key[0].toUpperCase() + result.split(' ').join('_').toUpperCase();
        } else {
            return key
        }

    }
}

const textFormat = new TextFormat()
export default textFormat