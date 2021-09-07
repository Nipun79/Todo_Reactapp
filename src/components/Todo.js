import React,{useState,useEffect} from 'react'
import "./style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")
    if(lists)
    return JSON.parse(lists)
    else
    return []
}

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [editedItem, setEditedItem] = useState("")
    const [isToggle, setIsToggle] = useState(false)
    //Add Item
    const addItem = () => {
        if(!inputData)
        alert("Please Add Data")
        // edited item
        else if(inputData && isToggle){
            setItems(
                items.map( (currElement) => {
                    if (currElement.id === editedItem) {
                    return{...currElement,name:inputData}
                    }
                    return currElement;

                })
            )
            setInputData([])
            setEditedItem("")
            setIsToggle(false)
        }
        
        else 
        {
            const Data = {
                id: new Date().getTime().toString(),
                name : inputData
            }
            setItems([...items,Data])
            setInputData("");
        };
    };
    //Delete items
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
          return curElem.id !== index;
        });
        setItems(updatedItems);
      };
    //remove All
    const removeAll = () => {
        setItems([])
    }
    
    //local storage
    useEffect(() => {
        return () => {
            localStorage.setItem("mytodolist",JSON.stringify(items) )
        }
    },[items])

    //Edit Items
    const editItem = (index) =>{
        const item_edited = items.find( (currElement) => {
            return currElement.id === index
        })
        setInputData(item_edited.name)
        setEditedItem(index)
        setIsToggle(true)
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    
                    <figure>
                        <img src="./images/Todo.svg" alt="Todo"></img>
                        <figcaption>Add Your List Here </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="Add Item" className="form-control" 
                        value = {inputData} 
                        onChange= { (event) => setInputData(event.target.value) } />
                        {isToggle ? <i class="fas fa-edit add-btn"  onClick={addItem} ></i> : <i class="fa fa-plus"  onClick={addItem} ></i>}
                        
                    </div>
                    <div className="showItems">

                        { items.map( (currElement) => {
                            return(
                        <div className="eachItem" key= {currElement.id}>
                            <h3>{currElement.name}</h3>
                            <div className="todo-btn">
                            <i class="fas fa-edit add-btn" onClick = {() => editItem(currElement.id)}></i>
                            <i class="fas fa-trash-alt add-btn" onClick ={() => deleteItem(currElement.id)} ></i>
                            </div>
                        </div>          
                            );
                        } ) }

                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text = "Remove All" onClick={removeAll}>
                           <span> CHECK LIST </span>   
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
