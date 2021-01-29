import 'setimmediate'
if (!global.setImmediate) {
    global.setImmediate = setTimeout as unknown as typeof global.setImmediate
}
export {default} from '../App'
