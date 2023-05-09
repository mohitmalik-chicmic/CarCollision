import { _decorator, Canvas, Component, instantiate, macro, Node, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BotCars')
export class BotCars extends Component {
    @property({ type: Node })
    planeNode: Node = null;
    @property({ type: Node })
    BotNode: Node = null;
    @property({ type: Node })
    parentNode: Node = null;
    deltatime: number;
    CharacterPosition: any;
    speed: number = 10;
    newCar: Node = null;
    newCarArray: Node[] = []
    start() {
        let node = this.BotNode
        this.schedule(() => {
            this.newCar = instantiate(node)
            console.log("New Car", this.newCar)
            // this.node.addChild(this.newCar)
            this.parentNode.addChild(this.newCar)
            this.newCar.getComponent(BotCars).enabled = false
            let newCarXPos = Math.floor(Math.random() * (7 - (-7)) + (-7));
            let newCarZPos = Math.floor(Math.random() * (1 - (-15)) + (-15));
            // this.newCar.eulerAngles = v3(0, -40, 0)
            this.newCar.setPosition(newCarXPos, 0, newCarZPos)
            // this.newCar.setPosition(0, 0, 0)
            // this.newCar.setScale(1, 1, 1)
            this.newCarArray.push(this.newCar)
        }, 4, 6, 1)

    }
    moveBot() {
        for (let i = 0; i < this.newCarArray.length; i++) {
            this.CharacterPosition = new Vec3();
            let Destination = new Vec3();
            Destination.x =
                this.newCarArray[i].getPosition().x -
                this.newCarArray[i].forward.x * this.deltatime * this.speed
            Destination.y = this.newCarArray[i].getPosition().y;
            Destination.z =
                this.newCarArray[i].getPosition().z +
                this.newCarArray[i].forward.z * this.deltatime * this.speed
            Vec3.lerp(
                this.CharacterPosition,
                this.newCarArray[i].getPosition(),
                Destination,
                0.5
            );
            this.newCarArray[i].setPosition(this.CharacterPosition);
        }
    }
    update(deltaTime: number) {
        this.deltatime = deltaTime
        this.moveBot()

    }
}

