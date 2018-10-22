module.exports =  {
    wrap: (str, o) => {
        if (!str || !o) {
            return str;
        }
        return o + String(str) + o;
    }
}