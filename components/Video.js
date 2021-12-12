const Video = (props) => {

    return (
        <div className="video-container" key={props.idx}>
            <label> Titre vidéo:
                <input type='text' name='title' onChange={(e) => props.onChange(e)} />
            </label>

            <label> Description:
                <input type='text' name='description' onChange={(e) => props.onChange(e)} />
            </label>

            <label> Video Url:
                <input type='text' name='url' onChange={(e) => props.onChange(e)} />
            </label>

            {props.idx ? <button className="button-supp" type="button" onClick={(e) => props.removeVideo(e)}>Supp</button> : null}
        </div>
    );
}

export default Video;