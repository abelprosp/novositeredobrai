// The animation overlay and the 3D equipment use the same orthographic view.
export const lineView = {
  aspect: 2.45,
  halfWidth: 8.55,
  camera: [6, 11.2, 21],
  target: [-.35, 1.25, .75],
};

function normalize([x, y, z]) {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}

function cross([x, y, z], [a, b, c]) {
  return [y * c - z * b, z * a - x * c, x * b - y * a];
}

const cameraBack = normalize(lineView.camera.map((value, index) => value - lineView.target[index]));
const cameraRight = normalize(cross([0, 1, 0], cameraBack));
const cameraUp = cross(cameraBack, cameraRight);

function project(point, axis) {
  return point.reduce((sum, value, index) => sum + (value - lineView.target[index]) * axis[index], 0);
}

const sharedPath = [
  [0, -4.16, 2.36, .69],
  [2.8, -4.16, 2.36, .69],
  [3.26, -4.07, 1.84, .69],
  [3.8, -3.48, 1.31, .53],
  [5.2, -.73, 1.31, .53],
  [6.7, .52, 1.31, .53],
  [7.4, 1.55, 1.31, .53],
];
const approvedPath = [...sharedPath, [9, 5.45, 1.31, .53], [9.42, 5.84, .79, .53], [10.4, 6.2, .19, .53]];
const rejectedPath = [...sharedPath, [8.15, 2.73, 1.31, .53], [8.46, 2.73, 1.18, 1.26], [9.2, 2.73, .19, 2.52]];

function positionAlong(time, path) {
  const index = path.findIndex(([moment]) => moment > time);
  if (index === -1) return path[path.length - 1].slice(1);
  if (index === 0) return path[0].slice(1);

  const [start, ...from] = path[index - 1];
  const [end, ...to] = path[index];
  const progress = (time - start) / (end - start);
  return from.map((value, axis) => value + (to[axis] - value) * progress);
}

export function projectCaps(time) {
  return [false, true, false].map((rejected, index) => {
    const elapsed = Math.max(0, time - index * .64);
    const point = positionAlong(elapsed, rejected ? rejectedPath : approvedPath);
    const release = Math.min(1, Math.max(0, (elapsed - 2.8) / .46));
    const moldSpacing = 1 - release;
    point[0] += (index - 1) * .24 * moldSpacing;
    point[2] -= index * .22 * moldSpacing;

    if (!rejected) {
      const settled = Math.min(1, Math.max(0, (elapsed - 9.42) / .98));
      point[0] += index * .16 * settled;
      point[2] += index * .08 * settled;
    }

    return {
      x: 50 + 50 * project(point, cameraRight) / lineView.halfWidth,
      y: 50 - 50 * project(point, cameraUp) * lineView.aspect / lineView.halfWidth,
      status: elapsed < 6.7 ? 0 : rejected ? 2 : 1,
    };
  });
}
