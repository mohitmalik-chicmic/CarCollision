import { _decorator, BoxCollider, Component, ICollisionEvent, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Truck')
export class Truck extends Component {
    collider: BoxCollider;
    start() {
        this.collider = this.node.getComponent(BoxCollider);
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this)
    }
    onCollisionEnter(event: ICollisionEvent) {
        const otherCollider = event.otherCollider;
        console.log("Collider", otherCollider.node.name)
        if (otherCollider.node.name === 'group' || otherCollider.node.name === "MainPlane") {
            this.node.getComponent(RigidBody).isStatic = true
            return;
        }
    }

    update(deltaTime: number) {

    }
}

