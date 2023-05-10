const Actor = ({ name, img}) => {
    return ( 
        <div className="actor" style={{color: 'white'}}>
            {name}
            <img src={img} alt="Image" />
        </div>
     );
}
 
export default Actor;