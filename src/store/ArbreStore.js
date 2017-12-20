class ArbreStore {

  constructor () {
    this.state = {
      arbre: {},
      id: 0
    }
  }

  setObjet (objet) {
    this.state.arbre = objet
  }

  setValue (prop, value) {
    this.state.arbre[prop] = value
  }

  setId (id) {
    this.state.id = id
  }

  getId () {
    return this.state.id
  }
}

let arbreStore = new ArbreStore()
export default arbreStore
