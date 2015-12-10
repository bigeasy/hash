function djb (hash, block, start, end) {
    for (var i = start; i < end; i++) {
        hash = (hash * 33 + block[i]) >>> 0
    }
    return hash
}

module.exports = djb
