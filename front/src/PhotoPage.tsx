import "./styles/main.scss";
// components
import Header from "./component/Header";
import PageTitle from "./component/PageTitle";

export default function PhotoPage() {
    return (
        <>
            <Header />
            <PageTitle title="Photos" />
        </>
    )
}
