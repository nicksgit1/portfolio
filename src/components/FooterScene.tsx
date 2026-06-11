/**
 * The footer's decorative retrowave scene: the setting sun and city
 * skylines seated on the glowing grid horizon. Purely visual — every
 * element is aria-hidden, and all styling lives in scene.css.
 *
 * Contract: must render inside a `position: relative` footer; the
 * scape anchors to the footer's top edge (the horizon line).
 */
export function FooterScene() {
  return (
    <>
      <div aria-hidden="true" className="city-scape">
        <div className="city-sun" />
        <div className="city-far" />
        <div className="city-near" />
      </div>
      <div aria-hidden="true" className="synth-grid" />
    </>
  );
}
