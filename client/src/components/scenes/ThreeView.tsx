import { Component, createRef, ReactNode, RefObject } from "react";
import MVScene from "./MVScene";
import './Carousel.css';

export default class ThreeView extends Component {
    public containerReference: RefObject<HTMLDivElement>;
    public canvasReference: RefObject<HTMLCanvasElement>;
    public scene: MVScene;

    public constructor(props: Readonly<any> | any) {
        super(props);
        this.containerReference = createRef();
        this.canvasReference = createRef();
    }

    public componentDidMount(): void {
        const container = this.containerReference.current;
        const canvas = this.canvasReference.current;
        this.scene = new MVScene(canvas, container);

        this.registerEvents();
    }

    public componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    public componentWillUnmount(): void {
        this.unregisterEvents();
    }

    protected registerEvents(): void {
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    protected unregisterEvents(): void {
        window.removeEventListener('mousemove', this.onMouseMove.bind(this));
        window.removeEventListener('resize', this.onWindowResize.bind(this));
    }

    protected onMouseMove(): void {
        this.scene?.onMouseMove();
    }

    protected onWindowResize(): void {
        this.scene?.onViewportResize();
    }
    

    public render(): ReactNode {
        return (
            <div className="carousel" ref={this.containerReference}>
                <canvas ref={this.canvasReference} />
            </div>
        );
    }
}
