	function calculate_drag(cd, rho, v, a){
			    var sac = (0.5)*(cd)*(rho)*(a);
				
				var drag = new THREE.Vector3(0, 0, 0);
				drag.setX(sac*v.x*v.x);
				drag.setY(sac*v.y*v.y);
				drag.setZ(sac*v.z*v.z);
				drag.multiplyScalar(-1);
				return drag;
			}
			
			//calculates the net force 
			//takes drag, lift, and thrust forces, and adds them together
			//gravity is included in the physics engine
			function calculate_net_force(drag, lift, thrust){
			    var net = new THREE.Vector3(0, 0, 0);
				net.add(drag).add(lift).add(thrust);
				return net;
			}
			//cl is the lift coefficient
            //rho is the air density
            //a is the area of the wings			
			function calculate_lift(cl, rho, v, a){
			    var lift_scalar = (0.5)*(cl)*(rho)*(a)*(v)*(v);
				
				var lift = new THREE.Vector3(0,0,0);
				
				lift.setY(lift_scalar);
				
				return lift;
			}
			//planes should be rendered 
			//z+ corresponds with the propeller
			//y+ is the top of the plane_body
			//y- is the bottom of the plane_body
			//x+ is (port?)
			function render_plane(){
				
			    var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
			    var sph = new THREE.MeshLambertMaterial({color: 0xf0f0f0});
				
			    var geom_body = new THREE.CubeGeometry( 1.5, 1.5, 7);
				
			    plane_body = new Physijs.BoxMesh( geom_body, material, 10);
				
			    var geom_top_sph = new THREE.SphereGeometry(1, 32,32);
			    var plane_top = new THREE.Mesh(geom_top_sph, sph);
				
				var geom_front_sph = new THREE.SphereGeometry(1, 32, 32);
			    var plane_front = new THREE.Mesh(geom_front_sph, sph);
			    
				
			    //plane_body.rotation.y=35*Math.PI/180;
				plane_front.position.z=3.5;
				
			    plane_top.position.z=.8
			    plane_top.position.y=1.3;
				
				//camera
				
				//camera.position.z-=10;
				
				//
			    
			    plane_body.add(plane_front);
			    plane_body.add(plane_top);
				plane_body.position.y=15;
				
				
				//plane_body.add(camera);
				
				//////////////////////////////////camera pains
				/*
				camera.rotation.x=0;
				camera.rotation.y=0;
				
				
				camera.position.y=-15;
			    camera.position.x=0;
				camera.position.z=10;
				camera.rotation.x=70*Math.PI/180;
			    */
				
				//////////////
				
				//an object3d will nullify physics engine
				
				//results in up is z+
				//right is x+
				//forward is y+
				
			    
			}
			function calculate_thrust(m){
				
				if ( keyboard.pressed("V") )
		        thrust =0;
				if ( keyboard.pressed("B") )
				thrust = 5*m;
				if ( keyboard.pressed("N") )
				thrust = 10*m;
				if ( keyboard.pressed("M") )
				thrust = 15*m;
				return new THREE.Vector3(0, thrust, 0);				  
			}
			
			function calculate_turn(){
				
				var qt = new THREE.Vector3(0, -3, 0);
				qt.applyQuaternion(plane_body.quaternion);
				if ( keyboard.pressed("A") ){
					plane_body.setAngularVelocity(qt);    
				}
				var ql = new THREE.Vector3(0, 3, 0);
				ql.applyQuaternion(plane_body.quaternion);
				if ( keyboard.pressed("D") ){
					plane_body.setAngularVelocity(ql); 
				}
				
				
				
			}
			
			function calculate_pitch(){
				
				var qt = new THREE.Vector3(-1, 0, 0);
				qt.applyQuaternion(plane_body.quaternion);
				if ( keyboard.pressed("W") ){
					plane_body.setAngularVelocity(qt);    
				}
				var ql = new THREE.Vector3(1, 0, 0);
				ql.applyQuaternion(plane_body.quaternion);
				if ( keyboard.pressed("S") ){
					plane_body.setAngularVelocity(ql); 
				}
				
				
				
			}
			function setupGui(){
				myGui ={
					
					liftx:0,
					lifty:0,
					liftz:0,
					dragx: 0,
					dragy: 0,
					dragz: 0,
					thrustx:0,
					thrusty:0,
					thrustz:0,
					positionx:0,
					positiony:0,
					positionz:0,
					velocityx:0,
					velocityy:0,
					velocityz:0,
					accelerationx:0,
					accelerationy:0,
					accelerationz:0
					
					
				};
				var gui = new dat.GUI();
				var h = gui.addFolder("Drag");
				h.add( myGui, "dragx").listen();
				h.add( myGui, "dragy").listen();
				h.add( myGui, "dragz").listen();
				//h.open();
				h = gui.addFolder("Lift");
				h.add(myGui, "liftx").listen();
				h.add(myGui, "lifty").listen();
				h.add(myGui, "liftz").listen();
				//h.open();
				h = gui.addFolder("Thrust");
				h.add(myGui, "thrustx").listen();
				h.add(myGui, "thrusty").listen();
				h.add(myGui, "thrustz").listen();
				//h.open();
				h = gui.addFolder("Position");
				h.add(myGui, "positionx").listen();
				h.add(myGui, "positiony").listen();
				h.add(myGui, "positionz").listen();
				//h.open();
				h = gui.addFolder("Velocity");
				h.add(myGui, "velocityx").listen();
				h.add(myGui, "velocityy").listen();
				h.add(myGui, "velocityz").listen();
				//h.open();
				h = gui.addFolder("Acceleration");
				h.add(myGui, "accelerationx").listen();
				h.add(myGui, "accelerationy").listen();
				h.add(myGui, "accelerationz").listen();
				
			}	
			
			function listen(drag, lift, thrust){
				myGui.dragx=drag.x;
				myGui.dragy=drag.y;
				myGui.dragz=drag.z;
				
				myGui.liftx=lift.x;
				myGui.lifty=lift.y;
				myGui.liftz=lift.z;
				
				myGui.thrustx=thrust.x;
				myGui.thrusty=thrust.y;
				myGui.thrustz=thrust.z;
				
				myGui.positionx = plane_body.position.x;
				myGui.positiony = plane_body.position.y;
				myGui.positionz = plane_body.position.z;
				
				myGui.velocityx = plane_body.getLinearVelocity().x;
				myGui.velocityy = plane_body.getLinearVelocity().y;
				myGui.velocityz = plane_body.getLinearVelocity().z;
			}