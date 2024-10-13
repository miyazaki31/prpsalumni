function Timeline(selector, config) {
    // vars --------------------
  
    // vars: global elements
    var tl = this;
    var selector = document.querySelector(selector);
  
    // vars: classes
    var clsTimeline = "timeline";
    var clsTimelineItem = clsTimeline + "__item";
    var clsTimelineFooter = clsTimeline + "__footer";
    var clsTimelineTrack = clsTimeline + "__track";
    var clsTimelineCircle = clsTimeline + "__circle";
  
    var clsLoading = "is-loading";
    var clsInit = "is-init";
    var clsLeft = "is-left";
    var clsRight = "is-right";
    var clsCurrent = "is-current";
    var clsVisible = "is-visible";
    var clsBelow = "is-below";
    var clsAbove = "is-above";
  
    // vars: elements
    var timelineElem = selector.querySelectorAll("." + clsTimeline);
    var timelineItems = selector.querySelectorAll("." + clsTimelineItem);
    var footerElem = selector.querySelector("." + clsTimelineFooter);
    var trackElem = selector.querySelector("." + clsTimelineTrack);
    var circleElem = selector.querySelector("." + clsTimelineCircle);
  
    const defaults = {
      track: {
        endAtLast: false
      },
      viewPointOffset: 0 // 0 = middle of the screen
    };
  
    this.options = Object.assign(defaults, config);
  
    document.addEventListener("DOMContentLoaded", function (event) {
      tl.init();
    });
  
    tl.init = function () {
      selector.classList.add(clsLoading);
      selector.classList.add(clsInit);
      selector.offsetHeight;
      selector.classList.remove(clsLoading);
  
      tl.animation();
  
      window.onscroll = function (event) {
        tl.animation();
      };
  
      window.onresize = function (event) {
        tl.animation();
      };
    };
  
    tl.animation = function () {
      var scrollTop = document.documentElement.scrollTop;
      let viewPointOffset =
        scrollTop + window.innerHeight / 2 + this.options.viewPointOffset;
  
      tl.updateTrack(viewPointOffset);
  
      timelineItems.forEach(function (elem, index) {
        var top = elem.getBoundingClientRect().top + window.scrollY;
        var bottom = top + elem.offsetHeight;
  
        if ((index + 1) % 2 == 0) {
          elem.classList.add(clsRight);
        } else {
          elem.classList.add(clsLeft);
        }
  
        if (viewPointOffset < top) {
          tl.updateClasses(elem, clsBelow);
        } else if (viewPointOffset > bottom) {
          tl.updateClasses(elem, [clsAbove, clsVisible]);
        } else {
          tl.updateClasses(elem, [clsCurrent, clsVisible]);
        }
      });
  
      if (footerElem) {
        let footerTop = footerElem.getBoundingClientRect().top + window.scrollY;
  
        if (viewPointOffset < footerTop) {
          tl.updateClasses(footerElem, "");
        } else {
          tl.updateClasses(footerElem, clsVisible);
        }
      }
    };
  
    tl.updateClasses = function (elem, cls) {
      elem.classList.remove(clsCurrent, clsAbove, clsBelow, clsVisible);
      if (cls !== "" && !Array.isArray(cls)) {
        elem.classList.add(cls);
      } else if (cls !== "" && Array.isArray(cls)) {
        elem.classList.add(...cls);
      }
  
      if (cls.includes(clsCurrent)) {
        var elemLeft, elemPad;
        var elemTrackWidth = trackElem.getBoundingClientRect().width;
        var elemTrackLeft = trackElem.getBoundingClientRect().left;
        var circleWidth = circleElem.offsetWidth;
  
        if (window.innerWidth < 768) {
          elemLeft = elem.getBoundingClientRect().left;
          elemPad = parseInt(
            window.getComputedStyle(elem).getPropertyValue("padding-left")
          );
          circleElem.style.left = elemPad + elemTrackWidth + "px";
        } else {
          if (elem.classList.contains(clsLeft)) {
            elemPad = parseInt(
              window.getComputedStyle(elem).getPropertyValue("padding-right")
            );
            circleElem.style.left = -(elemPad - elemTrackWidth / 2) + "px";
          } else if (elem.classList.contains(clsRight)) {
            elemPad = parseInt(
              window.getComputedStyle(elem).getPropertyValue("padding-left")
            );
            circleElem.style.left = elemPad + elemTrackWidth / 2 + "px";
          }
        }
      } else if (!selector.querySelector("." + clsCurrent)) {
        circleElem.style.left = null;
        circleElem.style.bottom = null;
      }
    };
  
    tl.updateTrack = function (viewPointOffset) {
      var top = trackElem.getBoundingClientRect().top + window.scrollY;
      var height = viewPointOffset - top;
      if (height < 0) height = 0;
  
      trackElem.style.height = height + "px";
  
      tl.trackHeight();
    };
  
    tl.trackHeight = function () {
      var trackMax = selector.offsetHeight;
  
      if (footerElem) {
        trackMax -= footerElem.offsetHeight;
      }
  
      if (this.options.track.endAtLast) {
        trackMax =
          trackMax -
          selector.querySelectorAll("." + clsTimelineItem + ":last-child")
            .offsetHeight +
          9;
      }
  
      trackElem.style.maxHeight = trackMax + "px";
    };
  }
  
  new Timeline(".timeline", {
    viewPointOffset: -160
  });
  


  // scroll to recent 


 