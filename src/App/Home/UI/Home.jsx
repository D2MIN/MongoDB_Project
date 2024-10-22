import Header from "../../../Widgets/Header/UI/Header";

function Home(){
    return(
        <div className="homePage">
            <Header/>
            <div className="searchSection">
                <input className="searchInput"/>
                <button className="searchButton">Поиск</button>
            </div>
            <div className="storageListSection">
                <div className="storage">Storage 1</div>
                <div className="storage">Storage 2</div>
                <div className="storage">Storage 3</div>
            </div>
        </div>
    );
}

export default Home;