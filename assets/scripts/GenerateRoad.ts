import { _decorator, Component, macro, Node, NodePool, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GenerateRoad')
export class GenerateRoad extends Component {
    @property({ type: Node })
    frontRoadNode: Node = null;
    @property({ type: Node })
    lastRoadNode: Node = null;
    roadChildren: Node[] = []
    popupPool: NodePool = new NodePool();
    lastNodeRef: any
    frontNodeRef: any;
    moveRoadSchedular: any = null;
    start() {
        this.roadChildren = [...this.node.children]
        this.lastNodeRef = this.lastRoadNode.getPosition();
        this.frontNodeRef = this.frontRoadNode.getPosition();
        this.moveRoadHurdle()
    }
    moveRoadHurdle() {
        this.moveRoadSchedular = this.schedule(() => {
            for (let i = 0; i < this.roadChildren.length; i++) {
                let pos = this.roadChildren[i].getPosition().z + 0.3
                this.roadChildren[i].setPosition(new Vec3(this.roadChildren[i].getPosition().x, this.roadChildren[i].getPosition().y, pos))
                // console.log(this.frontRoadNode.getPosition().z, this.roadChildren[i].getPosition().z)
                if (this.roadChildren[i].getPosition().z >= this.frontNodeRef.z) {
                    //   console.log("inside if condition")
                    this.roadChildren[i].setPosition(this.lastNodeRef)
                }
            }
        }, 0, macro.REPEAT_FOREVER, 0)
    }
    stopRoadMovement() {
        this.unscheduleAllCallbacks()
    }
    update(deltaTime: number) {

    }
}

