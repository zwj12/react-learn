class WebService {
    constructor() {
    }

    static GetRapidSymbolDataSync(strTask, strModule, strName) {
        var rwServiceResource = new XMLHttpRequest();
        var strResource="/rw/rapid/symbol/data/RAPID/" + strTask + "/" + strModule + "/" + strName+ "?json=1";
        // console.log(strResource);
        rwServiceResource.open("GET", strResource, false);
        rwServiceResource.send();
        if (rwServiceResource.status == 200) {
            // console.log(rwServiceResource.responseText);
            var obj = JSON.parse(rwServiceResource.responseText);
            var service = obj._embedded._state[0];
            return service.value;
        }
    }

}

export default WebService;