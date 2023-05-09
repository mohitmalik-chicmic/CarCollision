import { _decorator, BoxCollider, Component, EventKeyboard, ICollisionEvent, Input, input, KeyCode, Node, Quat, RigidBody, tween, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CarMove')
export class CarMove extends Component {
    moveCharacter: boolean;
    CharacterPosition: any;
    deltatime: number;
    speed: number = 20;
    collider: BoxCollider;
    forwardDirection: boolean;
    @property({ type: Node })
    frontCollider: Node = null;
    @property({ type: Node })
    backCollider: Node = null;
    colliderBack: BoxCollider;
    startGame: boolean = false
    stopCharacter: boolean = false
    @property({ type: Node })
    truckNode: Node = null;
    start() {
        input.on(Input.EventType.TOUCH_MOVE, function (event) {
            var mousePos = event.getLocation();
            mousePos.x
            this.mousex = mousePos.x;
            this.mousey = mousePos.y;
            this.mousez = mousePos.x
            //********Rotating Character on it's Y-Axis based on mouse X-Axis
            this.node.eulerAngles = v3(0, this.mousex, 0);
        }, this);
        // this.changePos = this.node.getPosition();
        input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        this.collider = this.frontCollider.getComponent(BoxCollider);
        this.colliderBack = this.backCollider.getComponent(BoxCollider)
        console.log(this.collider.name, "=node name")
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this)
        this.colliderBack.on('onCollisionEnter', this.onCollisionEnter, this)

    }
    onCollisionEnter(event: ICollisionEvent) {
        console.log(event.selfCollider.name.split("<")[0], "=node name")
        let selfColliderName = event.selfCollider.name.split("<")[0]
        const otherCollider = event.otherCollider;
        if (otherCollider.node.name === 'group' || otherCollider.node.name === "MainPlane") {
            console.log("Collision inside If", event)
            return;
        }
        console.log("Collision outside If", event)
        const otherRigidBody = otherCollider.node.getComponent(RigidBody)!;
        const selfRigidBody = event.selfCollider.node

        if (selfColliderName === "frontCollider") {
            // const otherRigidBody = otherCollider.node.getComponent(RigidBody)!;
            // //  otherRigidBody.useGravity = true;
            // //  otherRigidBody.applyForce(new Vec3(0, 1500, -1500), new Vec3(0, 0.5, 0));
            // otherCollider.node.eulerAngles = v3(-180, 0, 0)
            // const collider = event.selfCollider;
            // //    collider.addMask(Constants.CarGroup.NORMAL);
            // const rigidBody = this.node.getComponent(RigidBody)!;
            // //      rigidBody.useGravity = true;
            // //  otherCollider.node.setPosition(new Vec3(otherCollider.node.getPosition().x, 0, otherCollider.node.getPosition().z))
            // this.scheduleOnce(() => {
            //     otherCollider.node.active = false
            // }, 1.5)

            //    otherRigidBody.applyForce(new Vec3(0, 2, -200), new Vec3(0, 0.5, 0));
            this.speed = 0;
            this.moveCharacter = false
            this.stopCharacter = true
            otherCollider.node.setPosition(new Vec3(0, 1, otherCollider.node.getPosition().z))
            // tween(otherCollider.node)
            //     .by(0.5, { eulerAngles: v3(-90, 0, 0) })
            otherCollider.node.eulerAngles = v3(-90, 0, 90)
            this.speed = 20
            otherRigidBody.applyForce(new Vec3(0, 200, (-100 * (this.speed / 2))), new Vec3(0, 0.5, 0));
            //  rigidBody.useGravity = true;
            // otherRigidBody.useGravity = true;
            this.scheduleOnce(() => {
                otherCollider.node.active = false
            }, 2)
        }
        else {
            console.log("backCollisionHappend");
            this.speed = 0;
            this.moveCharacter = false
            this.stopCharacter = true

            this.truckNode.eulerAngles = v3(-70, 0, 0)
            this.scheduleOnce(() => {
                this.truckNode.eulerAngles = v3(-90, 0, 0)
                // this.truckNode.eulerAngles = v3(-90, 0, 90)
            }, 0.3)
            this.scheduleOnce(() => {
                // this.truckNode.eulerAngles = v3(-90, 0, 0)
                this.truckNode.eulerAngles = v3(-90, 0, 90)
            }, 0.3)
            this.node.setPosition(new Vec3(this.node.getPosition().x, 1, this.node.getPosition().z))
            otherCollider.node.setPosition(new Vec3(0, 1, otherCollider.node.getPosition().z))
            this.speed = 0;
            this.scheduleOnce(() => {
                this.node.active = false
            }, 2)

            // otherRigidBody.applyForce(new Vec3(0, 2, -200), new Vec3(0, 0.5, 0));
            // otherCollider.node.setPosition(new Vec3(0, 1, otherCollider.node.getPosition().z))
            // otherCollider.node.eulerAngles = v3(0, 0, 90)
        }
        //   rigidBody.useGravity = true;
        //  rigidBody.useGravity = true;
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE: {
                this.speed = 0;
                this.forwardDirection = false
                this.moveCharacter = false
                this.stopCharacter = true
                console.log("Space key pressed")
            }
                break;
        }
    }
    onKeyPressing(event: EventKeyboard) {
        this.startGame = true
        this.stopCharacter = false
        switch (event.keyCode) {
            // case KeyCode.SPACE: {
            //     this.speed = 0;
            //     this.forwardDirection = false
            //     console.log("Space key pressed")
            // }
            //     break;
            case KeyCode.ARROW_UP:
            case KeyCode.KEY_W: {
                console.log("UP Pressed");
                // this.node.eulerAngles = v3(0, this.pos, 0)
                this.moveCharacter = true
                this.forwardDirection = true
                // this.characterPosition()
            }
                break;
            case KeyCode.ARROW_DOWN:
            case KeyCode.KEY_S: {
                console.log("Down Pressed");
                this.moveCharacter = true
                this.forwardDirection = false
            }
                break;
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A: {    //Left Arrow
                this.CharacterPosition = new Vec3();
                let Destination = new Vec3();
                Destination.x =
                    this.node.getPosition().x -
                    this.node.right.x
                Destination.y = this.node.getPosition().y;
                Destination.z =
                    this.node.getPosition().z -
                    this.node.right.z
                Vec3.lerp(
                    this.CharacterPosition,
                    this.node.getPosition(),
                    Destination,
                    0.2
                );
                this.node.setPosition(this.CharacterPosition);
            }
                break;
            case KeyCode.ARROW_RIGHT:
            case KeyCode.KEY_D: { //Right Arrow

                this.CharacterPosition = new Vec3();
                let Destination = new Vec3();
                Destination.x =
                    this.node.getPosition().x +
                    this.node.right.x
                Destination.y = this.node.getPosition().y;
                Destination.z =
                    this.node.getPosition().z +
                    this.node.right.z
                Vec3.lerp(
                    this.CharacterPosition,
                    this.node.getPosition(),
                    Destination,
                    0.2
                );
                this.node.setPosition(this.CharacterPosition);
            }
                break;
        }
    }
    onKeyUp(event: EventKeyboard) {
        // this.node.eulerAngles = v3(0, this.pos, 0)
        this.speed = 20
        this.moveCharacter = false
        // this.characterPosition()
    }
    update(deltaTime: number) {
        if (this.startGame) {
            if (this.forwardDirection) {
                if (this.moveCharacter) {
                    this.deltatime = deltaTime
                    this.CharacterPosition = new Vec3();
                    let Destination = new Vec3();
                    Destination.x =
                        this.node.getPosition().x +
                        this.node.forward.x * deltaTime * (this.speed += 0.1)
                    Destination.y = this.node.getPosition().y;
                    Destination.z =
                        this.node.getPosition().z +
                        this.node.forward.z * deltaTime * (this.speed += 0.1)
                    Vec3.lerp(
                        this.CharacterPosition,
                        this.node.getPosition(),
                        Destination,
                        0.5
                    );
                    this.node.setPosition(this.CharacterPosition);
                }
                else if (!this.stopCharacter) {
                    this.speed = 10;
                    this.deltatime = deltaTime
                    this.CharacterPosition = new Vec3();
                    let Destination = new Vec3();
                    Destination.x =
                        this.node.getPosition().x +
                        this.node.forward.x * deltaTime * this.speed
                    Destination.y = this.node.getPosition().y;
                    Destination.z =
                        this.node.getPosition().z +
                        this.node.forward.z * deltaTime * this.speed
                    Vec3.lerp(
                        this.CharacterPosition,
                        this.node.getPosition(),
                        Destination,
                        0.5
                    );
                    this.node.setPosition(this.CharacterPosition);
                }
            }
            else if (!this.forwardDirection) {
                if (this.moveCharacter) {
                    this.deltatime = deltaTime
                    this.CharacterPosition = new Vec3();
                    let Destination = new Vec3();
                    Destination.x =
                        this.node.getPosition().x -
                        this.node.forward.x * deltaTime * (this.speed += 0.1)
                    Destination.y = this.node.getPosition().y;
                    Destination.z =
                        this.node.getPosition().z -
                        this.node.forward.z * deltaTime * (this.speed += 0.1)
                    Vec3.lerp(
                        this.CharacterPosition,
                        this.node.getPosition(),
                        Destination,
                        0.5
                    );
                    this.node.setPosition(this.CharacterPosition);
                }
                else if (!this.stopCharacter) {
                    this.speed = 10;
                    this.deltatime = deltaTime
                    this.CharacterPosition = new Vec3();
                    let Destination = new Vec3();
                    Destination.x =
                        this.node.getPosition().x -
                        this.node.forward.x * deltaTime * this.speed
                    Destination.y = this.node.getPosition().y;
                    Destination.z =
                        this.node.getPosition().z -
                        this.node.forward.z * deltaTime * this.speed
                    Vec3.lerp(
                        this.CharacterPosition,
                        this.node.getPosition(),
                        Destination,
                        0.5
                    );
                    this.node.setPosition(this.CharacterPosition);
                }
            }
        }
    }
}

