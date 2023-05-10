const Movie = ({title, tagline, popularity}) => {
    return ( 
        <div className="movie">
            Title: {title} <br/>
            Tagline: {tagline} <br/>
            Popularity: {popularity}
        </div>
     );
}
 
export default Movie;