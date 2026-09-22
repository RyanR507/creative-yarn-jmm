// Runs a scroll action as an immediate jump. global.css sets
// `html { scroll-behavior: smooth }`, which a plain scrollTo()/scrollIntoView()
// would inherit; briefly switching it off works in every browser without
// relying on the newer `behavior: "instant"` value.
//
// The forced reflow (reading offsetHeight) matters: right after React swaps
// the page content the layout is still stale, and a scroll issued at that
// moment can be silently discarded, leaving the visitor at the old offset.
export function jumpScroll(action) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  void root.offsetHeight;
  try {
    action();
  } finally {
    root.style.scrollBehavior = previous;
  }
}

export function jumpToTop() {
  jumpScroll(() => window.scrollTo(0, 0));
}
