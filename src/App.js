import React, { useContext } from 'react';
import './App.css';
import {PokemonData} from './PokemonAppContext';
import GroceryList from './GroceryList';
import PokemonDetails from './PokemonDetails.js'
import PokemonSearchPage from './PokemonSearch/PokemonSearchPage.js'
import PokemonCollection from './PokemonCollection/PokemonCollection.js'
import SimilarTypesPage from './PokemonTypes/SimilarTypesPage.js'
import HomePage from './Home.js'
import Battle from './PokemonBattle/Battle'



const Navigation = (props) =>{
	const data = useContext(PokemonData);
	return (
		<li className="nav-item link">
			<a className="nav-link" id={props.Item} onClick={data.modifyPage}>{props.DisplayText}</a>
		</li>
	)
}

const NavBar = () =>{
	const data = useContext(PokemonData);
	return (
		<ul className="navigation nav nav-pills">
			<Navigation Item="HOME" DisplayText="HOME"/>
			<Navigation Item="BROWSE" DisplayText="BROWSE"/>
			<Navigation Item="SIMILARTYPES" DisplayText="SIMILARTYPES"/>
			<Navigation Item="COLLECTION" DisplayText="COLLECTION"/>
			{(data.debug)?<Navigation Item="POKEMONDETAILS" DisplayText="DETAILS"/>:""}
			<Navigation Item="BATTLE" DisplayText="BATTLE"/>
			<Navigation Item="GROCERYLIST" DisplayText="SHOPPING LIST"/>
		</ul>
	);
}

const PageContent = () => {
	const data = useContext(PokemonData);
	switch (data.currentPageViewing) {
    case "HOME":{
      return(
        <div>
          <HomePage />
        </div>
      )
    }
		case "BROWSE":{
			return (<div>
            <PokemonSearchPage />
					</div>
			);
		}
		case "SIMILARTYPES":{
			return (
				<div>
          <SimilarTypesPage />
				</div>
			);
		}
		case "COLLECTION":{
			return (
				<div>
          <PokemonCollection />
				</div>
			);
		}
		case "BATTLE":{
			return (
				<div>
					<Battle/>
				</div>
			);
		}
		case "GROCERYLIST":{
			return (
				<div>
					<GroceryList/>
				</div>
			);
		}
		case "POKEMONDETAILS":{
			return (
				<PokemonDetails />
			);
		}
		default:{
			return (
				<div>
					This is the {data.currentPageViewing} page.
				</div>
			);
		}
	}
}

class App extends React.Component{
	constructor(props) {
		super(props)
		this.state={
      currentPageViewing: "HOME",
      currentPokemon: 'eevee',
      currentPokemonType: 'normal',
			Pokemon: {}, //Contains page-specific data
			MyCollection: ['eevee', 'ditto'],
			GroceryList: [{name:"Item1",quantity:3},{name:"Item2",quantity:5},{name:"Item3",quantity:1}],
			GroceryListItem: "",
			GroceryListAmt: 0,
			GroceryListFormItem: undefined,
			debug: false, //Turn off to hide navbar links used during testing.
			BattleInfo1: <b></b>,
			BattleInfo2: <b></b>,
			BattleTurnCount: 0,
			PokemonName1: "",
			PokemonName2: "",
			Pokemon1Data: {},
			Pokemon2Data: {},
			Pokemon1TypeData: [],
			Pokemon2TypeData: [],
			BattleLog: "",
			BattleLog2: "",
			PokemonEffectiveness: [1,1],
			finalMult: 0,
			setPokemon1: (e)=>{
				this.setState({PokemonName1:e.target.value});
			},
			setPokemon2: (e)=>{
				this.setState({PokemonName2:e.target.value});
			},
			modifyPage: (e)=>{
				this.setState({currentPageViewing:e.target.id});
				//alert(this.state.currentPageViewing)
			},
			updateAddedItem: (e)=>{
				this.setState({GroceryListItem:e.target.value})
			},
			updateQuantityItem: (e)=>{
				this.setState({GroceryListAmt:Number(e.target.value)})
			},
			addToGroceryList: (e)=>{
				if (this.state.GroceryListItem.length>0) {
					var list = this.state.GroceryList
					var found=false;
					var item = {name:this.state.GroceryListItem,quantity:this.state.GroceryListAmt};
					for (var i=0;i<list.length;i++) {
						if (list[i].name.toLowerCase()===item.name.toLowerCase()) {
								found=true;
								list[i].quantity+=item.quantity;
								break;
						}
					}
					if (!found) {
						list.push(item)
					}
					this.setState({GroceryList:list})
					document.getElementById("item").value=""
					document.getElementById("quantity").value="1"
					this.setState({GroceryListItem:e.target.value})
				}
			},
			addItemToGroceryList: (item)=>{
				var list = this.state.GroceryList
				var found=false;
				for (var i=0;i<list.length;i++) {
					if (list[i].name.toLowerCase()===item.name.toLowerCase()) {
							found=true;
							list[i].quantity+=item.quantity;
							break;
					}
				}
				if (!found) {
					list.push(item)
				}
				this.setState({GroceryList:list})
				alert(item.name+" added to cart!");
			},
			removeFromGroceryList: (e)=>{
				var list = this.state.GroceryList
				list.splice(e.target.id,1)
				this.setState({GroceryList:list})
			},
			updateTypeData: (pokemon,data)=>{
				if (pokemon===1) {
					var list = this.state.Pokemon1TypeData
					list.push(data)
					this.setState({Pokemon1TypeData:list})
				} else {
					var list = this.state.Pokemon2TypeData
					list.push(data)
					this.setState({Pokemon2TypeData:list})
				}
			},
			BattleFightPhase: "SEARCHING",
			doPhase: (e)=>{
				switch (e.target.id) {
					case "SEARCHING":{
						this.setState({BattleInfo1:this.state.PokemonName1})
						this.setState({BattleInfo2:this.state.PokemonName2})
						this.setState({PokemonEffectiveness:[1,1]});
						this.setState({Pokemon1TypeData:[]});
						this.setState({Pokemon2TypeData:[]});
						
						
						fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.PokemonName1.toLowerCase()}`).then(res => res.json()).then(
						(data)=>{this.setState({Pokemon1Data:data})}).then(()=>{
						fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.PokemonName2.toLowerCase()}`).then(res => res.json()).then(
						(data)=>{this.setState({Pokemon2Data:data})})})/*.then(
						fetch(`${this.state.Pokemon1Data.types[0].type.url}`)).then(res=>res.json()).then((data)=>{this.setState({Pokemon1TypeData:data})}).then(fetch(`${this.state.Pokemon2Data.types[0].type.url}`)).then(res=>res.json()).then((data)=>{this.setState({Pokemon2TypeData:data})}).*/.then(
						//Something.
						).catch(()=>{this.setState({BattleInfo1:"Something went wrong!"})})
						setTimeout(()=>{
							if (this.state.Pokemon1Data.types!==undefined) {
							for (var i=0;i<this.state.Pokemon1Data.types.length;i++) {
								fetch(this.state.Pokemon1Data.types[i].type.url).then(res=>res.json()).then((data)=>{
									var list = this.state.Pokemon1TypeData
									list.push(data)
									this.setState({Pokemon1TypeData:list})})
							}} else {
								var info =<b>Something went wrong!</b>
								this.setState({BattleInfo1:info})
							}
							
							if (this.state.Pokemon2Data.types!==undefined) {
							for (var i=0;i<this.state.Pokemon2Data.types.length;i++) {
								fetch(this.state.Pokemon2Data.types[i].type.url).then(res=>res.json()).then((data)=>{var 	list = this.state.Pokemon2TypeData
									list.push(data)
									this.setState({Pokemon2TypeData:list})})
							}} else {
								var info =<b>Something went wrong!</b>
								this.setState({BattleInfo2:info})
							}
							
						},2000);
						
						setTimeout(()=>{
							this.state.determineBattleResults()	
						},4000)
						
					}break;
				}
			},
			compareDamageOnTypes: (numb)=>{
				var finalMult = 1;
				var opposingData = this.state.Pokemon2Data;
				var opposingTypeData = this.state.Pokemon2Data;
				if (Number(numb)===1) {
					opposingData = this.state.Pokemon2Data;
					opposingTypeData = this.state.Pokemon2TypeData;
				} else {
					opposingData = this.state.Pokemon1Data;
					opposingTypeData = this.state.Pokemon1TypeData;
				}
				
				for (var i=0;i<opposingTypeData.length;i++) {
					var typeData = opposingTypeData[i].damage_relations;
					//Look at no damage from.
					for (var j=0;j<typeData.no_damage_from.length;j++) {
						var newType = typeData.no_damage_from[j].name
					var enemyMatchingTypes = opposingData.types.filter((type)=>type.type.name===newType);
						if (enemyMatchingTypes.length>0) {
							finalMult*=0;
							console.log("Vulnerability went down to "+finalMult+"! Matching types: "+JSON.stringify(enemyMatchingTypes))
						}
						return 0;
					}
					//Look at double damage from.
					for (var j=0;j<typeData.double_damage_from.length;j++) {
						var newType = typeData.double_damage_from[j].name
					var enemyMatchingTypes = opposingData.types.filter((type)=>type.type.name===newType);
					console.log(enemyMatchingTypes)
						if (enemyMatchingTypes.length>0) {
							finalMult*=2;
							console.log("Vulnerability went up to "+finalMult+"! Matching types: "+JSON.stringify(enemyMatchingTypes))
						}
					}
					//Look at half damage from.
					for (var j=0;j<typeData.half_damage_from.length;j++) {
						var newType = typeData.half_damage_from[j].name
					var enemyMatchingTypes = opposingData.types.filter((type)=>type.type.name===newType);
						if (enemyMatchingTypes.length>0) {
							finalMult/=2;
							console.log("Vulnerability went down to "+finalMult+"! Matching types: "+JSON.stringify(enemyMatchingTypes))
						}
					}
				}
				return finalMult;
			},
			determineBattleResults: ()=>{
				if (this.state.Pokemon1Data.stats!==undefined) {
				var p1Atk = this.state.Pokemon1Data.stats[1].base_stat;
				var p2Atk = this.state.Pokemon2Data.stats[1].base_stat;
				var p1MAtk = this.state.Pokemon1Data.stats[3].base_stat;
				var p2MAtk = this.state.Pokemon2Data.stats[3].base_stat;
				var p1Def = this.state.Pokemon1Data.stats[2].base_stat;
				var p2Def = this.state.Pokemon2Data.stats[2].base_stat;
				var p1MDef = this.state.Pokemon1Data.stats[4].base_stat;
				var p2MDef = this.state.Pokemon2Data.stats[4].base_stat;
				var p1HP = this.state.Pokemon1Data.stats[0].base_stat;
				var p2HP = this.state.Pokemon2Data.stats[0].base_stat;
				var pokemon1Power =  this.state.compareDamageOnTypes(2)*((Math.max(p1Atk-p2Def,1)+Math.max(p1MAtk-p2MDef,1)));
				var pokemon2Power =  this.state.compareDamageOnTypes(1)*((Math.max(p2Atk-p1Def,1)+Math.max(p2MAtk-p1MDef,1)));
				
				var turns1 = Math.ceil(p2HP/pokemon1Power);
				var turns2 = Math.ceil(p1HP/pokemon2Power);
				
				var log = "It will take "+turns1+"turns for p1 to kill p2, dealing "+pokemon1Power+" per attack w/p2 having "+p2HP+" HP. I have a type "+(this.state.compareDamageOnTypes(2)>1?"advantage":"disadvantage")+" against my opponent."
				var log2 = "It will take "+turns2+" turns for p2 to kill p1, dealing "+pokemon2Power+" per attack w/p1 having "+p1HP+" HP. I have a type "+(this.state.compareDamageOnTypes(1)>1?"advantage":"disadvantage")+" against my opponent."
				
				if (turns1>turns2) {
					log="I will lose! "+log
					log2="I will win! "+log2
				} else {
					log="I will win! "+log
					log2="I will win! "+log2
				}
				
				} else {
					log = "Loading...";
					log2 = "Loading...";
				}
				
				this.setState({BattleLog:log})
				this.setState({BattleLog2:log2})
      },
      addToCollection: (e) => {
        if (this.state.MyCollection.indexOf(e.target.id) === -1) {
          this.setState({
            MyCollection: this.state.MyCollection.concat(e.target.id)
          })
          alert(`${e.target.id} added to collection!`)
        } else {
          alert(`${e.target.id} already in collection!`)
        }
      },
      removeFromCollection: (e) => {
        var list = this.state.MyCollection
        list.splice(e.target.id, 1)
        this.setState({MyCollection: list})
        alert(this.state.MyCollection.join(', '))
      },
      setCurrentPokemon: (e) => {
        this.setState({
          currentPokemon: e.target.id,
          currentPageViewing: 'POKEMONDETAILS'
        })
      },
      setCurrentPokemonType: (e) => {
        this.setState({
          currentPokemonType: e.target.id,
          currentPageViewing: 'SIMILARTYPES'
        })
      }
		}
	}
	render() {
		return  (
			<PokemonData.Provider value={this.state}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 bg-dark text-white p-3">
							<NavBar className="" />
						</div>
					</div>
					<div className="row bg-dark">
						<div className="col-md-10  bg-dark text-white rounded p-3">
							<PageContent />
						</div>
					</div>
				</div>
			</PokemonData.Provider>
		);
	}
}

export default App;