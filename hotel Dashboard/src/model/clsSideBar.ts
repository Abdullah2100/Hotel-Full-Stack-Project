class clsSideBar {
    index: number;
    imageName: string;
    navigationPage: string;

    constructor(index: number, image: string, navDestination: string) {

        this.index = index;
        this.imageName = image;
        this.navigationPage = navDestination;
    }
}
export default clsSideBar;