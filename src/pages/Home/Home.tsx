import React, { useContext } from "react";
import { Feed } from "../../components/Feed/Feed"
import { Header } from "../../components/Header/Header"
import { Aside } from "../../components/Aside/Aside"
import { Search } from "../../components/Search/Search"
import { AddPost } from "../../components/AddPost/AddPost"
import { LoadingContext } from "../../Context/LoadingContext";
import { LoadingScreen } from "../../components/Loading/LoadingScreen"

const Home: React.FC = () => {
  const loadingContext = useContext(LoadingContext)

  if (!loadingContext) {
    return <div>Error: LoadingContext is not available</div>;
  }

  const { loading } = loadingContext;

  if (loading) {
    return ( <LoadingScreen /> )
  } else {
    return (
      <main className="bg-black h-full min-h-screen w-full flex justify-center">
        <Aside />
        <div className="flex flex-col items-center">
          <Header title="Posts" />
          <AddPost />
          <Feed />
        </div>
        <Search />
      </main>
    )
  }
}

export { Home }