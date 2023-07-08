import UserData from "./components/UserData";
function App () {
    const api =  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    return (
        <div>
            < UserData api = {api} />;
        </div>
    );
}
export default App;