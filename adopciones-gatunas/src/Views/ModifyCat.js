import React, { Component } from 'react'
import axios from 'axios'

import './ModifyCat.css'

export default class ModifyCat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cat: {
        is_adopted: false,
        is_active: true,
        picture: '',
        age: 0,
        gender: 'H',
        first_owner: [
          {
            name: '',
            last_name: '',
            celphone: 0,
            enter_date: ''
          }
        ],
        current_owner: {
          owner_name: '',
          owner_last_name: '',
          owner_celphone: 0,
          owner_email: '',
          owner_adopt_date: ''
        }
      },
      token: sessionStorage.getItem("token"),
      disabled: true,
      modify: false
    }
  }
  componentDidMount () {
    const URL = `https://nameless-citadel-76715.herokuapp.com/api/v1/cat/${this.props.match.params.catid}`
    axios.get(URL, { headers: { 'Authorization': `tk ${this.state.token}` } })
      .then((result) => {
        this.setState({ cat: result.data })
      }).catch((err) => {
        this.props.history.push('/')
      });
  }
  onBtnSubmitSave = (e) => {
    e.preventDefault()
    const url = `https://nameless-citadel-76715.herokuapp.com/api/v1/update/cat/${this.props.match.params.catid}/`
    const requestBody = this.state.cat
    axios.put(url, requestBody, { headers: { 'Authorization': `tk ${this.state.token}` } })
      .then((result) => {
        console.log(result)
        // alert(`User was saved with the id: ${result.data.id}`)
        // this.props.history.push(`/`)
      }).catch((err) => {
        console.log(err.response.data)
      });
  }
  changeModifyStatus = () => {
    this.setState({
      disabled: false,
      modify: true
    })
    document.getElementById('save').disabled = false
  }
  cancelModify = () => {
    this.setState({
      disabled: true,
      modify: false
    })
    document.getElementById('save').disabled = false
  }
  renderModifyBtn = () => {
    return this.state.modify === false
      ? <button type="button" id="modify" className="btn btn-warning mt-auto mb-auto col-3" onClick={this.changeModifyStatus}>Modificar Datos</button>
      : <button type="button" id="modify" className="btn btn-cancel mt-auto mb-auto col-3" onClick={this.cancelModify}>Cancelar</button>
  }
  renderAdoptedBtn = () => {
    return this.state.cat.is_adopted === false
      ? <button type="button" id="adopt" className="btn btn-success mt-auto mb-auto col-3" onClick={this.adoptCat}>Adoptar</button>
      : true
  }
  adoptCat = () => {
    console.log('adoptado');
  }
  onCatInputCatChange = (e) => {
    const { id, value } = e.target
    const newCat = { ...this.state.cat }
    newCat[id] = value
    this.setState({
      cat: newCat
    })
  }
  onFirstOwnerInputChange = (e) => {
    const { id, value } = e.target
    const newCat = { ...this.state.cat }
    const firstOwner = { ...this.state.cat.first_owner }
    firstOwner[0][id] = value
    const newFirstOwner = Object.values(firstOwner)
    newCat.first_owner = newFirstOwner
    this.setState({
      cat: newCat
    })
  }
  onCurrentOwnerInputChange = (e) => {
    const { id, value } = e.target
    const newCat = { ...this.state.cat }
    const currentOwner = { ...this.state.cat.current_owner }
    currentOwner[0][id] = value
    const newCurrentOwner = Object.values(currentOwner)
    newCat.first_owner = newCurrentOwner
    this.setState({
      cat: newCat
    })
  }
  renderAdoptInfo = () => {
    return this.state.cat.is_adopted === true

      ? <div className="row col-6 no-gutters pl-4">
        <div className="col-12 my-4">
          <h5>Datos del primer dueño</h5>
        </div>
        <div className="col-12 col-md-6 pr-md-3">
          <label>Primer Nombre</label>
          <input
            id="owner_name"
            type="text"
            className="form-control"
            placeholder="Primer nombre"
            onChange={this.onCurrentOwnerInputChange}
            value={this.state.cat.current_owner[0].owner_name}
            disabled={this.state.disabled}
          />
        </div>
        <div className="col-12 col-md-6 pl-md-3">
          <label>Segundo Nombre</label>
          <input
            id="owner_last_name"
            type="text"
            className="form-control"
            placeholder="Segundo nombre"
            onChange={this.onCurrentOwnerInputChange}
            value={this.state.cat.current_owner[0].owner_last_name}
            disabled={this.state.disabled}
          />
        </div>
        <div className="col-12 mt-4">
          <label>Teléfono</label>
          <input
            id="owner_celphone"
            type="number"
            className="form-control"
            placeholder="Teléfono"
            onChange={this.onCurrentOwnerInputChange}
            value={this.state.cat.current_owner[0].owner_celphone}
            disabled={this.state.disabled}
          />
        </div>
      </div>
      : true
  }

  render () {
    return (
      <div className="ModifyCat row col px-md-5 py-md-5 no-gutters">
        <div className="row col-12">
          <div className="col-12 col-md-4">
            <img src={this.state.cat.picture} className="card-img" alt="Gato"></img>
          </div>
          <div className="col-12 col-md-8 px-5 py-3">
            <div className="col-12 px-0">
              <h3>
                Meses: {this.state.cat.age}
              </h3>
              <h3>
                Genero: {this.state.cat.gender}
              </h3>
            </div>
            <div className="col-12 px-0 mt-3">{this.renderModifyBtn()}</div>
            <div className="col-12 px-0 mt-3">{this.renderAdoptedBtn()}</div>
            <div className="col-12 px-0 mt-3">
            <button type="button" id="modify" className="btn btn-danger mt-auto mb-auto col-3" onClick={this.changeModifyStatus}>Eliminar Gato</button>
            </div>
          </div>
        </div>
        <div className="row col-12 no-gutters">
          <div className="col-12">
            <div className="card-body px-0">
              <form onSubmit={this.onBtnSubmitSave} className="row no-gutters">
                <div className="row col-6 no-gutters pr-4">
                  <div className="col-12 my-4">
                    <h5>Datos del gato</h5>
                  </div>
                  <div className="col-12">
                    <label>Foto</label>
                    <input
                      id="picture"
                      className="form-control"
                      type="text"
                      placeholder="Foto"
                      onChange={this.onCatInputCatChange}
                      value={this.state.cat.picture}
                      disabled={this.state.disabled}
                    />
                  </div>
                  <div className="col-6 mt-4 pr-md-3">
                    <label>Edad</label>
                    <input
                      id="age"
                      className="form-control"
                      type="number"
                      placeholder="Edad"
                      onChange={this.onCatInputCatChange}
                      value={this.state.cat.age}
                      disabled={this.state.disabled}
                    />
                  </div>
                  <div className="col-6 mt-4 pl-md-3">
                    <label>Género</label>
                    <select
                      id="gender"
                      className="form-control"
                      placeholder="Género"
                      onChange={this.onCatInputCatChange}
                      value={this.state.cat.gender}
                      disabled={this.state.disabled}
                    >
                      <option>F</option>
                      <option>M</option>
                    </select>
                  </div>
                </div>
                <div className="row col-6 no-gutters pl-4">
                  <div className="col-12 my-4">
                    <h5>Datos del primer dueño</h5>
                  </div>
                  <div className="col-12 col-md-6 pr-md-3">
                    <label>Primer Nombre</label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="Primer nombre"
                      onChange={this.onFirstOwnerInputChange}
                      value={this.state.cat.first_owner[0].name}
                      disabled={this.state.disabled}
                    />
                  </div>
                  <div className="col-12 col-md-6 pl-md-3">
                    <label>Segundo Nombre</label>
                    <input
                      id="last_name"
                      type="text"
                      className="form-control"
                      placeholder="Segundo nombre"
                      onChange={this.onFirstOwnerInputChange}
                      value={this.state.cat.first_owner[0].last_name}
                      disabled={this.state.disabled}
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <label>Teléfono</label>
                    <input
                      id="celphone"
                      type="number"
                      className="form-control"
                      placeholder="Teléfono"
                      onChange={this.onFirstOwnerInputChange}
                      value={this.state.cat.first_owner[0].celphone}
                      disabled={this.state.disabled}
                    />
                  </div>
                </div>
                {this.renderAdoptInfo()}
                <button disabled={this.state.disabled} id="save" type="submit" className="btn btn-success mt-5 col-1 offset-11">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
