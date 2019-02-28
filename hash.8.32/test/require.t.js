require('proof')(1, prove)

function prove (okay) {
    okay(require('..'), 'require')
}
