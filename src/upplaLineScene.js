import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

import {lineView} from './upplaMotion.js';

function lineCamera() {
  const {halfWidth, aspect, camera: position, target} = lineView;
  const halfHeight = halfWidth / aspect;
  const camera = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, .1, 70);
  camera.position.set(...position);
  camera.lookAt(...target);
  return camera;
}

function standard(color, metalness = 0, roughness = .55) {
  return new THREE.MeshStandardMaterial({color, metalness, roughness});
}

function mergeParts(root) {
  root.updateMatrixWorld(true);
  const inverse = root.matrixWorld.clone().invert();
  const transform = new THREE.Matrix4();
  const batches = new Map();

  root.traverse(part => {
    if (!part.isMesh) return;
    const key = `${part.material.uuid}/${part.castShadow}/${part.receiveShadow}`;
    if (!batches.has(key)) batches.set(key, []);
    batches.get(key).push(part);
  });

  for (const parts of batches.values()) {
    if (parts.length === 1) continue;
    const geometry = parts.map(part => {
      const copy = part.geometry.index ? part.geometry.toNonIndexed() : part.geometry.clone();
      return copy.applyMatrix4(transform.multiplyMatrices(inverse, part.matrixWorld));
    });
    const combined = mergeGeometries(geometry);
    geometry.forEach(piece => piece.dispose());
    if (!combined) continue;
    const [first] = parts;
    const batch = new THREE.Mesh(combined, first.material);
    batch.castShadow = first.castShadow;
    batch.receiveShadow = first.receiveShadow;
    for (const part of parts) {
      part.removeFromParent();
      part.geometry.dispose();
    }
    root.add(batch);
  }
}

function makeLine(scene) {
  const metal = standard(0xaebac1, .43, .38);
  const zinc = standard(0x73838c, .48, .42);
  const paint = standard(0xd8e2de, .12);
  const teal = standard(0x25786b, .12);
  const dark = standard(0x29353d, .23);
  const black = standard(0x1c2829, .05, .83);
  const tread = standard(0x304840, .04, .8);
  const screen = new THREE.MeshBasicMaterial({color: 0x9adcc9});
  const green = standard(0x218158);
  const red = standard(0x9c483c);
  const glass = standard(0x214455, .48, .21);
  const floorStripe = standard(0xd3a64e, .03, .8);
  const casing = new THREE.Group();
  scene.add(casing);

  function mesh(geometry, material, x, y, z, parent = casing, shadow = true) {
    const piece = new THREE.Mesh(geometry, material);
    piece.position.set(x, y, z);
    piece.castShadow = shadow;
    piece.receiveShadow = true;
    parent.add(piece);
    return piece;
  }

  function box(material, x, y, z, w, h, d, parent, shadow) {
    return mesh(new THREE.BoxGeometry(w, h, d), material, x, y, z, parent, shadow);
  }

  function cylinder(material, x, y, z, top, bottom, height, parent, sides = 24) {
    return mesh(new THREE.CylinderGeometry(top, bottom, height, sides), material, x, y, z, parent);
  }

  function cable(points) {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    mesh(new THREE.TubeGeometry(curve, 28, .028, 6, false), black, 0, 0, 0);
  }

  function fastener(x, y, z) {
    cylinder(zinc, x, y, z, .034, .034, .029, casing, 6).rotation.x = Math.PI / 2;
  }

  // Rear-mounted injection barrel, hopper, clamping bay and platen inside a cutaway enclosure.
  for (const x of [-7.05, -5.35, -3.55]) {
    for (const z of [-.72, .72]) {
      cylinder(zinc, x, .07, z, .10, .14, .12);
      cylinder(dark, x, .2, z, .045, .045, .22);
    }
  }
  box(dark, -5.58, .30, 0, 4.15, .19, 1.78);
  box(paint, -6.29, .77, 0, 2.8, .82, 1.77);
  box(paint, -3.74, .83, -.47, 2.3, .94, .78);
  for (const x of [-7.16, -6.29, -5.42]) {
    box(zinc, x, .77, .89, .82, .62, .04);
    box(paint, x, .77, .92, .76, .56, .045);
    box(dark, x + .23, .84, .955, .075, .1, .024);
    for (let slot = 0; slot < 4; slot++) box(zinc, x - .11, .59 + slot * .044, .947, .34, .013, .01);
  }
  mesh(new RoundedBoxGeometry(2.46, 1.37, 1.62, 2, .085), teal, -6.45, 1.86, .03);
  box(dark, -6.45, 1.86, .857, 1.55, .97, .045);
  box(teal, -6.45, 1.86, .889, 1.43, .85, .04);
  for (let slot = 0; slot < 8; slot++) box(dark, -6.65 + slot * .11, 1.67, .92, .04, .27, .02);
  box(paint, -4.52, 2.83, -.05, 2.15, .15, 1.73);
  box(paint, -3.49, 2.02, -.745, .18, 1.76, .23);
  box(paint, -4.55, 2.00, -.75, 2.17, 1.53, .12);
  box(metal, -4.59, 1.44, -.2, 2.07, .12, .93);
  for (const y of [1.72, 2.64]) {
    for (const z of [-.52, .15]) {
      cylinder(metal, -4.58, y, z, .058, .058, 2.04).rotation.z = Math.PI / 2;
    }
  }
  cylinder(zinc, -5.16, 2.1, -.19, .19, .19, 1.4).rotation.z = Math.PI / 2;
  const fixedPlaten = mesh(new RoundedBoxGeometry(.31, .95, 1.17, 1, .035), zinc, -4.54, 2.13, .035);
  const movingPlaten = mesh(new RoundedBoxGeometry(.24, .91, 1.17, 1, .035), metal, -3.81, 2.13, .035);
  box(dark, -4.14, 2.16, .12, .62, .59, .86);
  for (const z of [-.17, .12, .41]) {
    cylinder(metal, -4.15, 2.295, z, .114, .114, .035);
    cylinder(dark, -4.15, 2.315, z, .081, .081, .018);
  }
  for (const x of [fixedPlaten.position.x, movingPlaten.position.x]) {
    for (const y of [1.77, 2.5]) fastener(x, y, .633);
  }
  const chute = box(metal, -3.96, 1.69, .55, .96, .07, .66);
  chute.rotation.z = -.48;

  cylinder(zinc, -6.65, 2.66, -.15, .13, .13, .28);
  cylinder(metal, -6.65, 2.94, -.15, .35, .15, .35);
  cylinder(zinc, -6.65, 3.17, -.15, .348, .348, .14);
  cylinder(dark, -6.65, 3.255, -.15, .377, .377, .045);
  const panel = new THREE.Group();
  panel.position.set(-5.40, 2.42, 1.0);
  panel.rotation.x = -.15;
  casing.add(panel);
  box(dark, 0, 0, 0, .51, .59, .17, panel);
  box(screen, -.018, .11, .09, .36, .26, .012, panel, false);
  for (let i = 0; i < 4; i++) box(teal, -.14, .2 - i * .052, .098, .12 + i * .049, .012, .006, panel, false);
  cylinder(red, .145, -.14, .097, .052, .052, .044, panel).rotation.x = Math.PI / 2;

  // Low-profile extruded rails, fabric belt, drive, return rollers and adjustable stands.
  box(tread, .80, 1.205, .53, 8.98, .115, 1.15);
  box(black, .80, 1.01, .53, 8.72, .055, 1.10);
  for (const z of [-.11, 1.17]) {
    box(metal, .80, 1.12, z, 9.05, .24, .15);
    box(zinc, .80, 1.10, z + (z > 0 ? .079 : -.079), 8.92, .032, .011);
    for (const x of [-3.54, -2.26, -.67, .92, 2.51, 4.1, 5.18]) fastener(x, 1.155, z + .085);
    for (const x of [-2.36, .91, 4.07]) {
      box(metal, x, .53, z, .16, 1.0, .16);
      box(dark, x, .045, z, .30, .06, .29);
      box(zinc, x, .81, z, .29, .2, .19);
    }
  }
  for (const x of [-3.64, 5.24]) {
    cylinder(zinc, x, 1.13, .53, .112, .112, 1.15).rotation.x = Math.PI / 2;
  }
  for (const x of [-2.36, .91, 4.07]) box(metal, x, .52, .53, .145, .16, 1.29);

  const drive = cylinder(dark, 5.03, 1.02, -.32, .23, .23, .37);
  drive.rotation.x = Math.PI / 2;
  for (let i = 0; i < 6; i++) {
    cylinder(zinc, 5.03, 1.02, -.47 + i * .052, .239, .239, .019).rotation.x = Math.PI / 2;
  }

  // Extrusion gantry with two compact downward-facing area-scan cameras and task lighting.
  for (const z of [-.38, 1.45]) {
    box(metal, .25, 1.92, z, .16, 1.56, .16);
    box(zinc, .25, 1.24, z, .37, .16, .36);
  }
  box(metal, .25, 2.72, .53, .18, .14, 2.02);
  box(zinc, .355, 2.721, .53, .014, .038, 1.93);
  for (const [x, z] of [[-.05, .39], [.59, .66]]) {
    box(metal, x, 2.60, z, .52, .07, .12);
    box(dark, x, 2.43, z, .22, .25, .245);
    box(zinc, x, 2.33, z, .232, .05, .255);
    cylinder(dark, x, 2.25, z, .098, .112, .13);
    cylinder(glass, x, 2.18, z, .072, .072, .017);
    cable([[x, 2.56, z], [x - .16, 2.84, z + .17], [x - .11, 2.78, -.28], [.25, 2.35, -.38]]);
  }
  const emitter = new THREE.MeshBasicMaterial({color: 0xd5e7df});
  for (const z of [.04, 1.02]) {
    box(dark, .21, 2.03, z, 1.1, .11, .12);
    box(emitter, .21, 1.965, z, 1.02, .02, .075);
  }
  const lightField = new THREE.MeshBasicMaterial({color: 0x64f2ad, transparent: true, opacity: 0, depthWrite: false});
  box(lightField, .23, 1.269, .53, 1.35, .010, 1.11, casing, false);

  // Side chute and two open ribbed totes for rejected and approved parts.
  const rejectSlide = new THREE.Group();
  rejectSlide.position.set(2.73, .89, 1.72);
  rejectSlide.rotation.x = .50;
  casing.add(rejectSlide);
  box(metal, 0, 0, 0, .81, .04, 1.50, rejectSlide);
  for (const x of [-.39, .39]) box(zinc, x, .065, 0, .046, .13, 1.50, rejectSlide);

  const endSlide = new THREE.Group();
  endSlide.position.set(5.79, .89, .53);
  endSlide.rotation.z = -.64;
  casing.add(endSlide);
  box(metal, 0, 0, 0, .94, .075, 1.09, endSlide);
  for (const z of [-.52, .52]) box(zinc, 0, .07, z, .94, .14, .045, endSlide);
  function tote(x, z, material) {
    const width = 1.35;
    const depth = 1.26;
    box(material, x, .09, z, width, .10, depth);
    for (const side of [-1, 1]) {
      box(material, x + side * .65, .26, z, .075, .36, depth);
      box(material, x, .26, z + side * .61, width, .36, .08);
      box(material, x, .454, z + side * .62, 1.40, .083, .115);
      box(material, x + side * .655, .454, z, .115, .082, 1.29);
      for (let rib = -2; rib <= 2; rib++) {
        box(material, x + rib * .21, .25, z + side * .655, .045, .28, .039);
      }
    }
  }
  tote(2.73, 2.52, red);
  tote(6.18, .53, green);
  box(floorStripe, -.35, .007, 3.54, 15.6, .012, .043, casing, false);
  box(floorStripe, -8.12, .007, 1.14, .043, .012, 4.82, casing, false);

  mergeParts(casing);

  return stage => {
    lightField.opacity = stage === 2 ? .32 : 0;
    emitter.color.setHex(stage === 2 ? 0xcdffdf : 0xd5e7df);
  };
}

export function mountLineScene(container) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: 'low-power'});
  } catch {
    return null;
  }
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdfe8e7);
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(95, 95), standard(0xbcc9c9, .05, .85));
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  const camera = lineCamera();
  scene.add(new THREE.HemisphereLight(0xf4fbff, 0x657971, 2.1));
  const key = new THREE.DirectionalLight(0xfff1df, 2.55);
  key.position.set(-5, 9, 6);
  key.target.position.set(-.75, 0, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, {near: 1, far: 28, left: -12, right: 12, top: 7.5, bottom: -7.5});
  key.shadow.normalBias = .033;
  key.shadow.bias = -.00015;
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0xd6eaff, 1.1);
  rim.position.set(1, 5, -6);
  scene.add(rim);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const updateLine = makeLine(scene);
  const resize = () => {
    const width = Math.round(container.clientWidth);
    if (!width) return;
    renderer.setSize(width, width / lineView.aspect, false);
    renderer.render(scene, camera);
  };
  const observer = new ResizeObserver(resize);
  resize();
  container.appendChild(renderer.domElement);
  observer.observe(container);

  return {
    canvas: renderer.domElement,
    draw(stage) {
      updateLine(stage);
      renderer.render(scene, camera);
    },
    dispose() {
      observer.disconnect();
      const materials = new Set();
      scene.traverse(object => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        materials.add(object.material);
      });
      materials.forEach(material => material.dispose());
      key.shadow.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
