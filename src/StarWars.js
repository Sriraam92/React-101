import React from 'react';

class FilmItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmname: null,
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(filmdata => {
        this.setState({
          filmname: filmdata.title,
        });
      });
  }

  render() {
    return (
      <li>
        {this.state.filmname}
      </li>
    );
  }
}


class StarWars extends React.Component {

    constructor() {
        super()

        this.state = {
            loadedCharacter: false,
            name: null,
            height: null,
            mass: null,
            birthyear: null,
            gender: null,
            home: null,
            films: [],
            img: null,
        }
    }

    getNewCharacter() {
        
        const rn = Math.round(Math.random()*82)
        const url = `https://swapi.dev/api/people/${rn}/`
        const iurl = `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/id/${rn}.json`

        fetch(url)
            .then(Response => Response.json())
            .then(data =>   {
                this.setState({
                    name: data.name,
                    height: data.height,
                    mass: data.mass,
                    birthyear: data.birth_year,
                    gender: data.gender,
                    films: data.films,
                    loadedCharacter: true,
                })
                fetch(data.homeworld)
                .then(Response => Response.json())
                .then(homeworlddata => {
                    this.setState({
                    home: homeworlddata.name,
                    })
                })
            })
        
        fetch(iurl)
            .then(response => response.json())
            .then(imageData => {
                this.setState({ img: imageData.image });
            });
    }
    
    render() {

        const movies = this.state.films.map((film,i) => {
            return <FilmItemRow key={i} url={film}/>
        })


        return (
            <div>
                {
                    !this.state.loadedCharacter &&
                    <div>
                        <h1>Generate Random Star Wars Character</h1>
                        <button type="button" onClick={() => this.getNewCharacter()} className="swbutton">

                            <h1>Randomize Character</h1>

                        </button>
                    </div>

                }
                

                {
                    this.state.loadedCharacter &&
                        <div>
                            
                            <h2>Character: {this.state.name}</h2>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '100px' }}>
                                {/* Left div for details */}
                                <div>
                                    <h4>Height: {this.state.height}</h4>
                                    <h4>Mass: {this.state.mass}</h4>
                                    <h4>Birth Year: {this.state.birthyear}</h4>
                                    <h4>Gender: {this.state.gender}</h4>
                                    <h4>Home World: {this.state.home}</h4>
                                </div>

                                {/* Right div for image */}
                                <div>
                                    <img
                                    src={this.state.img}
                                    alt={this.state.name}
                                    style={{ width: '400px', height: '500px', objectFit: 'cover', border: '1px solid white', padding: '5px'}}
                                    />
                                </div>
                            </div>

                            <hr></hr>
                            <h4>Films</h4>
                            <p>
                                {movies}
                            </p>

                            <button 
                                type="button" 
                                onClick={() => this.getNewCharacter()} 
                                className="swbutton">
                                <h1>Generate Different Character</h1>
                            </button>
                        </div>
                }
            </div>
        )
    }
}

export default StarWars;