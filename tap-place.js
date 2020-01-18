let num = 0;

function toggle() {
  num = (num + 1) % 4;
}

function getModelName() {
  switch (num) {
    case 1:
      return "treeMode";
    case 2:
      return "#tomatoModel";
    case 3:
      return "#unicornModel";
    default:
      return "#flyingSaucerModel";
  }
}

// Component that places trees where the ground is clicked
AFRAME.registerComponent("tap-place", {
  init: function() {
    const ground = document.getElementById("ground");
    ground.addEventListener("click", event => {
      // Create new entity for the new object
      const newElement = document.createElement("a-entity");

      // The raycaster gives a location of the touch in the scene
      const touchPoint = event.detail.intersection.point;
      newElement.setAttribute("position", touchPoint);

      const randomYRotation = Math.random() * 360;
      newElement.setAttribute("rotation", "0 " + randomYRotation + " 0");

      newElement.setAttribute("visible", "false");
      newElement.setAttribute("scale", "0.01 0.01 0.01");

      newElement.setAttribute("gltf-model", getModelName());
      this.el.sceneEl.appendChild(newElement);

      newElement.addEventListener("model-loaded", () => {
        // Once the model is loaded, we are ready to show it popping in using an animation
        newElement.setAttribute("visible", "true");
        newElement.setAttribute("animation", {
          property: "scale",
          to: "0.01 0.01 0.01",
          easing: "easeOutElastic",
          dur: 800
        });
      });
    });
  }
});
