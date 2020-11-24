'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('./defaults-75e5d8bf.js');
var buildColorStyles = require('./buildColorStyles-ca288c4b.js');
require('@keg-hub/re-theme/colors');
require('./platformFlatten-3e8e9019.js');
var inheritFrom = require('./inheritFrom.js');
var buildTheme = require('./buildTheme.js');
require('react');

var transition = function transition() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1s';
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';
  prop = jsutils.isArr(prop) ? prop : [prop];
  amount = jsutils.isNum(amount) && "".concat(amount, "s") || amount;
  return {
    transitionProperty: prop.map(jsutils.trainCase),
    transitionDuration: amount,
    transitionTimingFunction: type
  };
};
transition.move = function () {
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease';
  return {
    transition: "transform ".concat(amount, "s ").concat(type)
  };
};
transition.opacity = function () {
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease';
  return {
    transition: "opacity ".concat(amount, "s ").concat(type)
  };
};
transition.maxHeight = {
  overflow: 'hidden',
  transition: 'max-height 1s ease'
};

var defaults = buildColorStyles.getThemeDefaults();
var containedStyles = function containedStyles(state, colorType) {
  var opacity = jsutils.get(defaults, "states.types.".concat(state, ".opacity"));
  var shade = jsutils.get(defaults, "states.types.".concat(state, ".shade"));
  var activeColor = jsutils.get(buildColorStyles.colors, "surface.".concat(colorType, ".colors.").concat(shade));
  return {
    main: {
      $all: {
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: activeColor,
        padding: 9,
        minHeight: 35,
        opacity: opacity
      },
      $web: _rollupPluginBabelHelpers._objectSpread2({
        cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
        boxShadow: 'none'
      }, transition(['backgroundColor', 'borderColor'], 0.5)),
      $native: {}
    },
    content: {
      color: state === 'disabled' ? jsutils.get(buildColorStyles.colors, 'opacity._50') : jsutils.get(buildColorStyles.colors, 'palette.white01'),
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.5,
      textAlign: 'center',
      $web: _rollupPluginBabelHelpers._objectSpread2({}, transition(['color'], 0.5))
    }
  };
};
var contained = buildTheme.buildTheme(containedStyles);

var defaults$1 = buildColorStyles.getThemeDefaults();
var textStyle = function textStyle(state, colorType) {
  var shade = jsutils.get(defaults$1, "states.types.".concat(state, ".shade"));
  var activeColor = jsutils.get(buildColorStyles.colors, "surface.".concat(colorType, ".colors.").concat(shade));
  return {
    main: {
      $all: {
        backgroundColor: state === 'hover' ? buildColorStyles.colors.opacity(10, activeColor) : jsutils.get(buildColorStyles.colors, 'palette.transparent')
      }
    },
    content: {
      $all: {
        color: activeColor
      }
    }
  };
};
var text = buildTheme.buildTheme(textStyle, {
  inheritFrom: [contained]
});

var defaults$2 = buildColorStyles.getThemeDefaults();
var outlineStyles = function outlineStyles(state, colorType) {
  var stateShade = defaults$2.states.types[state].shade;
  var activeColor = jsutils.get(buildColorStyles.colors, "surface.".concat(colorType, ".colors.").concat(stateShade));
  return {
    main: {
      $all: {
        padding: 8,
        borderWidth: 1,
        borderColor: activeColor,
        backgroundColor: state === 'hover' ? buildColorStyles.colors.opacity(10, activeColor) : jsutils.get(buildColorStyles.colors, 'palette.white01')
      },
      $web: {
        outline: 'none'
      }
    },
    content: {
      $all: {
        color: activeColor
      }
    }
  };
};
var outline = buildTheme.buildTheme(outlineStyles, {
  inheritFrom: [contained]
});

var button = {
  contained: contained,
  text: text,
  outline: outline
};

var defaults$3 = buildColorStyles.getThemeDefaults();
var spaceHelper = function spaceHelper(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var type = arguments.length > 2 ? arguments[2] : undefined;
  sides = sides.length && sides || defaults$3.layout.sides;
  if (sides === 'all' || jsutils.isArr(sides) && sides[0] === 'all') sides = defaults$3.layout.sides;
  return sides.reduce(function (styles, side) {
    styles["".concat(type).concat(jsutils.capitalize(side))] = unitsHelper(amount);
    return styles;
  }, {});
};
var unitsHelper = function unitsHelper(value) {
  if (!jsutils.isStr(value) && !jsutils.isNum(value)) return value;
  if (jsutils.isStr(value)) {
    var amount = parseInt(value);
    if ((amount || amount === 0) && amount.toString() === value) value += defaults$3.font.units;
  } else value += defaults$3.font.units;
  return value;
};
var align = function align(dir) {
  return jsutils.isStr(dir) && {
    textAlign: dir
  } || {};
};
var background = function background(color) {
  return {
    backgroundColor: buildColorStyles.colors[color] || color || ''
  };
};
var bold = function bold() {
  return {
    fontWeight: defaults$3.font.bold
  };
};
var color = function color(_color) {
  return buildColorStyles.colors[_color] ? {
    color: buildColorStyles.colors[_color]
  } : {
    color: _color
  };
};
var size = function size(num) {
  return {
    fontSize: unitsHelper(num)
  };
};
var weight = function weight(num) {
  return {
    fontWeight: num
  };
};
var initial = function initial(prop) {
  return prop && _rollupPluginBabelHelpers._defineProperty({}, prop, 'initial');
};
var abs = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var helpers = {
  abs: abs,
  align: align,
  background: background,
  bold: bold,
  color: color,
  initial: initial,
  size: size,
  weight: weight
};

var defaults$4 = buildColorStyles.getThemeDefaults();
var size$1 = defaults$4.layout.margin;
var margin = function margin(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return spaceHelper(amount, sides, 'margin');
};
margin.size = size$1;
margin.full = {
  margin: size$1
};
margin.all = margin.full;
margin.vert = {
  marginLeft: size$1,
  marginRight: size$1
};
margin.left = {
  marginLeft: size$1
};
margin.right = {
  marginRight: size$1
};
margin.hor = {
  marginTop: size$1,
  marginBottom: size$1
};
margin.top = {
  marginTop: size$1
};
margin.bottom = {
  marginBottom: size$1
};

var defaults$5 = buildColorStyles.getThemeDefaults();
var size$2 = defaults$5.layout.padding;
var padding = function padding(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return spaceHelper(amount, sides, 'padding');
};
padding.size = size$2;
padding.full = {
  padding: size$2
};
padding.all = padding.full;
padding.vert = {
  paddingLeft: size$2,
  paddingRight: size$2
};
padding.left = {
  paddingLeft: size$2
};
padding.right = {
  paddingRight: size$2
};
padding.hor = {
  paddingTop: size$2,
  paddingBottom: size$2
};
padding.top = {
  paddingTop: size$2
};
padding.bottom = {
  paddingBottom: size$2
};

var flex = {
  align: function align(dir) {
    return {
      alignItems: dir
    };
  },
  direction: function direction(dir) {
    return {
      flexDirection: dir
    };
  },
  justify: function justify(dir) {
    return {
      justifyContent: dir
    };
  },
  display: {
    display: 'flex'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  center: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  right: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
};
flex.direction.row = {
  flexDirection: 'row'
};
flex.direction.column = {
  flexDirection: 'column'
};
flex.row = flex.direction.row;
flex.column = flex.direction.column;
flex.justify.start = {
  justifyContent: 'flex-start'
};
flex.justify.end = {
  justifyContent: 'flex-end'
};
flex.justify.center = {
  justifyContent: 'center'
};
flex.justify.between = {
  justifyContent: 'space-between'
};
flex.justify.around = {
  justifyContent: 'space-around'
};
flex.justify.even = {
  justifyContent: 'space-evenly'
};
flex.align.start = {
  alignItems: 'flex-start'
};
flex.align.end = {
  alignItems: 'flex-end'
};
flex.align.center = {
  alignItems: 'center'
};
flex.align.stretch = {
  alignItems: 'stretch'
};
flex.align.base = {
  alignItems: 'baseline'
};

var opacity05 = jsutils.get(buildColorStyles.colors, 'opacity._5');
var colorPalette = jsutils.get(buildColorStyles.colors, 'palette');
var section = {
  main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, flex.left), flex.column), {}, {
    borderColor: colorPalette.gray01,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    padding: 0,
    paddingBottom: padding.size / 2,
    margin: margin.size,
    marginBottom: 0,
    marginTop: margin.size - margin.size / 5
  }),
  text: {
    fontSize: 22,
    lineHeight: 26,
    color: jsutils.get(buildColorStyles.colors, 'opacity._65'),
    fontWeight: 'bold'
  },
  noBorder: {
    main: {
      borderBottomWidth: 0,
      borderTopWidth: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
    text: {
      lineHeight: 20
    }
  }
};
var contained$1 = {
  main: {
    $native: {
      shadowColor: opacity05,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1
    },
    $web: {
      boxShadow: "1px 1px 5px ".concat(opacity05)
    },
    $all: {
      backgroundColor: colorPalette.white01,
      margin: margin.size,
      paddingBottom: margin.size - margin.size / 5,
      borderColor: colorPalette.gray01,
      borderStyle: 'solid',
      borderWidth: 1
    }
  },
  container: {
    backgroundColor: colorPalette.transparent
  },
  header: section,
  footer: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, section), {}, {
    main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, section.main), {}, {
      paddingTop: padding.size / 2,
      paddingBottom: 0,
      marginBottom: 0,
      borderTopWidth: 1,
      borderBottomWidth: 0
    }),
    text: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, section.text), {}, {
      fontSize: 20,
      lineHeight: 24
    }),
    noBorder: {
      main: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingTop: 0,
        paddingBottom: 0
      },
      text: {
        lineHeight: 20
      }
    }
  }),
  media: {
    main: {
      position: 'relative',
      margin: 0,
      marginTop: margin.size - margin.size / 5
    },
    image: {},
    loadingComp: {
      main: {},
      progress: {},
      indicator: {}
    },
    video: {
      width: '100%'
    }
  },
  content: {
    main: {
      margin: margin.size,
      marginBottom: 0
    },
    callout: {
      title: {
        fontSize: 18,
        marginBottom: margin.size / 4,
        color: jsutils.get(buildColorStyles.colors, 'opacity._40'),
        fontWeight: '800'
      },
      subtitle: {
        fontSize: 13,
        marginBottom: margin.size,
        color: jsutils.get(buildColorStyles.colors, 'opacity._40'),
        fontWeight: '400'
      }
    },
    overlay: _rollupPluginBabelHelpers._objectSpread2({
      flex: 1,
      alignItems: 'center',
      backgroundColor: opacity05,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }, helpers.abs)
  }
};

var card = {
  default: contained$1
};

var divider = {
  $all: {
    width: '100%',
    backgroundColor: buildColorStyles.colors.opacity._15,
    marginBottom: margin.size,
    marginTop: margin.size / 3,
    height: 1
  },
  $native: {
    hairlineWidth: 1
  }
};

var drawer = {
  main: {
    overflow: 'hidden',
    width: "100%"
  }
};

var filePicker = {
  default: {
    $all: {
      main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      content: {
        input: {
          opacity: 0,
          position: 'absolute',
          display: 'none'
        },
        view: {
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        },
        file: {
          marginLeft: 5,
          fontSize: 11
        },
        button: {
          margin: 0
        }
      }
    }
  },
  disabled: {},
  hover: {},
  active: {}
};

var icon = {
  default: {
    container: {},
    icon: {}
  }
};

var colorPalette$1 = jsutils.get(buildColorStyles.colors, 'palette');
var image = {
  default: {
    container: {
      $all: {
        display: 'flex'
      }
    },
    loadingComp: {
      main: {
        position: 'absolute',
        alignSelf: 'stretch',
        display: 'flex',
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: colorPalette$1.white03
      },
      progress: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      indicator: {
        icon: {
          fontSize: '100px',
          color: colorPalette$1.gray02
        }
      }
    },
    loading: {
      opacity: 0
    },
    loaded: {
      opacity: 1
    },
    image: {
      $web: _rollupPluginBabelHelpers._objectSpread2({}, transition('opacity', 0.8))
    },
    hover: {}
  }
};

var container = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 36,
  minWidth: 36,
  position: 'relative'
};
var indicator = {
  default: {
    container: container,
    icon: {
      color: jsutils.get(buildColorStyles.colors, 'surface.default.colors.main')
    }
  },
  primary: {
    container: container,
    icon: {
      color: jsutils.get(buildColorStyles.colors, 'surface.primary.colors.main')
    }
  },
  secondary: {
    container: container,
    icon: {
      color: jsutils.get(buildColorStyles.colors, 'surface.secondary.colors.main')
    }
  },
  warn: {
    container: container,
    icon: {
      color: jsutils.get(buildColorStyles.colors, 'surface.warn.colors.main')
    }
  },
  danger: {
    container: container,
    icon: {
      color: jsutils.get(buildColorStyles.colors, 'surface.danger.colors.main')
    }
  }
};

var link = {
  default: {
    $all: {
      color: buildColorStyles.colors.palette.blue01,
      textDecorationLine: 'underline',
      textDecorationColor: buildColorStyles.colors.palette.blue02
    }
  },
  hover: {
    $all: {
      color: buildColorStyles.colors.palette.blue02,
      textDecorationColor: buildColorStyles.colors.palette.blue02
    }
  }
};

var colorPalette$2 = jsutils.get(buildColorStyles.colors, 'palette');
var styles = {
  main: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    icon: {
      fontSize: '100px',
      color: colorPalette$2.gray02
    }
  }
};
var loadingStyles = buildColorStyles.buildSurfaceStyles(function (colorType, surfaces) {
  var surfaceStyles = jsutils.deepClone(styles);
  jsutils.set(surfaceStyles, 'indicator.icon.color', jsutils.get(surfaces, "".concat(colorType, ".colors.main")));
  return surfaceStyles;
});
var loading = loadingStyles;

var section$1 = {
  default: {
    $native: {
      shadowColor: buildColorStyles.colors.opacity._05,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1
    },
    $web: {
      boxShadow: "1px 1px 5px ".concat(buildColorStyles.colors.opacity._05)
    },
    $all: {
      backgroundColor: buildColorStyles.colors.palette.white01,
      borderColor: buildColorStyles.colors.palette.gray01,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: padding.size,
      margin: margin.size,
      marginBottom: 0,
      minHeight: 200
    }
  }
};

var wrapper = {
	width: 250,
	padding: 5
};

var surface = buildColorStyles.colors.surface,
    palette = buildColorStyles.colors.palette;
var contained$2 = {
  default: {
    $all: {
      main: {
        minHeight: 100,
        width: wrapper.width,
        padding: wrapper.padding,
        backgroundColor: jsutils.get(surface, 'default.colors.light'),
        display: 'flex',
        flexDirection: 'column'
      },
      content: {
        wrapper: {
          display: 'flex',
          marginRight: wrapper.padding + 5,
          flex: 1,
          flexWrap: 'wrap'
        },
        text: {
          color: jsutils.get(palette, 'black03'),
          fontWeight: 'bold',
          fontSize: 10
        },
        clipboard: {
          opacity: 0.7,
          right: 0,
          top: 0,
          margin: wrapper.padding - 2,
          position: 'absolute'
        }
      }
    },
    $native: {
      main: {
        flexDirection: 'row',
        flex: 1
      },
      content: {
        clipboard: {}
      }
    }
  },
  disabled: {},
  hover: {},
  active: {}
};

var surface$1 = buildColorStyles.colors.surface;
var outlined = {
  default: {
    $all: {
      main: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: jsutils.get(surface$1, 'default.colors.main')
      }
    }
  }
};
outlined.default = inheritFrom.inheritFrom(contained$2.default, outlined.default);

var textBox = {
  outlined: outlined,
  contained: contained$2
};

var modal = {
  default: {
    main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
      zIndex: 9998
    }, flex.center), {}, {
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      alignItems: 'stretch'
    }),
    backdrop: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, helpers.abs), {}, {
      backgroundColor: 'rgba(1,1,1,0.2)'
    }),
    content: {
      $xsmall: {
        position: 'absolute',
        zIndex: 9999,
        alignSelf: 'center',
        backgroundColor: buildColorStyles.colors.palette.white01
      },
      $medium: {
        maxWidth: '80%'
      }
    }
  }
};

var defaultSectionStyle = {
  height: '100%',
  backgroundColor: 'transparent'
};
var sideContentMainStyle = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, defaultSectionStyle), {}, {
  justifyContent: 'center',
  paddingLeft: 0
});
var defaultSideSectionStyle = {
  main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, defaultSectionStyle), {}, {
    flexDirection: 'row',
    maxWidth: '20%'
  }, flex.align.center),
  content: {
    button: {
      main: _rollupPluginBabelHelpers._objectSpread2({}, sideContentMainStyle)
    },
    main: _rollupPluginBabelHelpers._objectSpread2({}, sideContentMainStyle),
    icon: {
      paddingHorizontal: 10,
      color: '#111111',
      fontSize: 30
    }
  }
};
var itemHeader = {
  main: {
    $all: {
      position: 'relative',
      justifyContent: 'center',
      backgroundColor: jsutils.get(buildColorStyles.colors, 'surface.primary.colors.dark'),
      width: '100%',
      flexDirection: 'row',
      height: 60
    },
    $web: {
      height: 70
    }
  },
  shadow: {
    main: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      position: 'relative',
      zIndex: 1
    },
    cover: {
      position: 'absolute',
      backgroundColor: jsutils.get(buildColorStyles.colors, 'surface.primary.colors.dark'),
      height: 10,
      width: '100%',
      flexDirection: 'row',
      top: -5,
      zIndex: 2
    }
  },
  appHeader: {
    main: {}
  },
  content: {
    left: {
      main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, flex.left), defaultSideSectionStyle.main),
      content: defaultSideSectionStyle.content
    },
    right: {
      main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, flex.right), defaultSideSectionStyle.main),
      content: defaultSideSectionStyle.content
    },
    center: {
      main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, flex.center), defaultSectionStyle), {}, {
        width: '60%'
      }),
      content: {
        title: {
          color: 'white'
        }
      }
    }
  }
};

var header = {
  itemHeader: itemHeader
};

var textToggle = {
  main: {
    fl: 1
  },
  textContainer: {},
  text: {
    ftSz: 20
  },
  linearGradient: {
    pos: 'absolute',
    bt: 40,
    lt: 0,
    rt: 0,
    height: 50
  },
  drawer: {
    main: {
      ovf: 'hidden',
      width: '100%'
    }
  },
  toggleComponent: {
    main: {
      mV: 15,
      alI: 'flex-end'
    },
    text: {
      txDL: 'underline'
    }
  }
};

var components = {
  button: button,
  card: card,
  divider: divider,
  drawer: drawer,
  filePicker: filePicker,
  icon: icon,
  image: image,
  indicator: indicator,
  link: link,
  loading: loading,
  section: section$1,
  textBox: textBox,
  modal: modal,
  header: header,
  textToggle: textToggle
};

var display = {
  none: {
    display: 'none'
  },
  inline: {
    display: 'inline'
  },
  inlineBlock: {
    display: 'inline-block'
  },
  block: {
    display: 'block'
  },
  flex: {
    display: 'flex'
  },
  float: {
    left: {
      float: 'left'
    },
    right: {
      float: 'right'
    },
    none: {
      float: 'none'
    }
  },
  click: {
    cursor: 'pointer'
  },
  noRadius: {
    borderRadius: 0
  }
};

var form = {
  default: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};

var defaults$6 = buildColorStyles.getThemeDefaults();
var height = jsutils.get(defaults$6, 'form.checkbox.height', 20);
var width = jsutils.get(defaults$6, 'form.checkbox.width', 20);
var checkboxDefault = {
  main: {
    $all: {
      width: '100%',
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    $web: {
      display: 'flex'
    }
  },
  content: {
    main: {
      $web: {
        outline: 'none',
        height: height,
        width: width,
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative'
      },
      $native: {
        alignItems: 'center'
      }
    },
    area: {
      off: {
        $all: {
          backgroundColor: jsutils.get(buildColorStyles.colors, 'palette.gray01')
        },
        $web: {
          outline: 'none',
          height: '100%',
          width: '100%',
          position: 'absolute',
          boxShadow: "inset 0px 0px 5px ".concat(jsutils.get(buildColorStyles.colors, 'opacity._15')),
          borderRadius: jsutils.get(defaults$6, 'form.border.radius', 5)
        }
      },
      on: {
        $all: {
          backgroundColor: jsutils.get(buildColorStyles.colors, 'surface.primary.colors.main')
        }
      }
    },
    indicator: {
      off: {
        $web: {
          color: jsutils.get(buildColorStyles.colors, 'palette.white02')
        }
      },
      on: {}
    },
    left: {
      flex: 1,
      textAlign: 'left'
    },
    right: {
      flex: 1,
      textAlign: 'right'
    }
  }
};
var checkboxClose = jsutils.deepMerge(checkboxDefault, {
  main: {
    $all: {
      justifyContent: 'flex-start'
    }
  },
  content: {
    left: {
      flex: 'none',
      marginRight: '10px',
      textAlign: 'inherit'
    },
    right: {
      flex: 'none',
      marginLeft: '10px',
      textAlign: 'inherit'
    }
  }
});
var disabledRules = {
  $all: {
    opacity: 0.4
  },
  $web: {
    cursor: 'not-allowed'
  }
};
var checkboxDisabled = {
  main: disabledRules,
  content: {
    main: disabledRules,
    input: {
      cursor: 'not-allowed'
    },
    right: {
      cursor: 'not-allowed'
    }
  }
};
var checkbox = {
  default: checkboxDefault,
  close: checkboxClose,
  disabled: checkboxDisabled
};

var header$1 = {
  $all: {
    $xsmall: {
      width: '70%',
      color: buildColorStyles.colors.lightGray,
      lineHeight: 19,
      padding: 1,
      paddingBottom: 6,
      marginBottom: 4,
      borderBottomWidth: 1,
      borderStyle: 'dotted'
    },
    $small: {
      padding: 2,
      paddingBottom: 12,
      marginBottom: 7
    }
  },
  $web: {
    letterSpacing: '0.105em'
  }
};
var simpleHeader = {
  main: {
    marginLeft: 27
  }
};
var checkGroup = {
  main: {},
  header: header$1,
  simpleHeader: simpleHeader
};

var defaults$7 = buildColorStyles.getThemeDefaults();
var sharedForm = {
  inputs: {
    backgroundColor: buildColorStyles.colors.palette.white01,
    minWidth: 100,
    overflow: 'hidden',
    height: jsutils.get(defaults$7, 'form.input.height', 35),
    padding: padding.size / 2
  },
  border: {
    borderRadius: 5,
    borderWidth: 1,
    borderTopColor: "".concat(buildColorStyles.colors.palette.gray01),
    borderLeftColor: "".concat(buildColorStyles.colors.palette.gray01),
    borderRightColor: "".concat(buildColorStyles.colors.palette.gray01),
    borderBottomColor: "".concat(buildColorStyles.colors.palette.gray02),
    borderStyle: 'solid'
  }
};

var input = {
  default: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sharedForm.border), sharedForm.inputs), {}, {
    width: '100%'
  })
};

var option = {};

var radio = {};

var select = {
  default: {
    main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
      position: 'relative'
    }, sharedForm.border), sharedForm.inputs), {}, {
      padding: 0,
      overflow: 'none'
    }),
    select: {
      $web: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sharedForm.inputs), {}, {
        borderWidth: 0,
        appearance: 'none',
        backgroundColor: buildColorStyles.colors.palette.transparent
      })
    },
    icon: {
      container: {
        color: buildColorStyles.colors.opacity._85,
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 10,
        pointerEvents: 'none'
      },
      icon: {
        color: buildColorStyles.colors.opacity._85,
        fontSize: 15
      },
      disabled: {
        color: buildColorStyles.colors.opacity._30
      }
    }
  }
};

var defaults$8 = buildColorStyles.getThemeDefaults();
var height$1 = jsutils.get(defaults$8, 'form.switch.height', 20);
var width$1 = jsutils.get(defaults$8, 'form.switch.width', 20);
var switchDefault = {
  main: {
    $all: {
      width: '100%',
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      display: 'flex'
    }
  },
  content: {
    main: {
      alignItems: 'center'
    },
    left: {
      flex: 1,
      textAlign: 'left'
    },
    right: {
      flex: 1,
      textAlign: 'right'
    },
    area: {
      off: {
        $web: {
          outline: 'none',
          backgroundColor: jsutils.get(buildColorStyles.colors, 'palette.gray01'),
          boxShadow: "inset 0px 0px 5px ".concat(jsutils.get(buildColorStyles.colors, 'opacity._15')),
          borderRadius: jsutils.get(defaults$8, 'form.border.radius', 5) * 2,
          height: '70%',
          width: '100%',
          position: 'absolute',
          top: 3
        },
        $native: {
          backgroundColor: jsutils.get(buildColorStyles.colors, 'surface.primary.colors.main')
        }
      },
      on: {}
    },
    indicator: {
      off: {
        $web: _rollupPluginBabelHelpers._objectSpread2({
          outline: 'none',
          backgroundColor: jsutils.get(buildColorStyles.colors, 'palette.white02'),
          borderRadius: jsutils.get(defaults$8, 'form.border.radius', 5) * 2,
          boxShadow: "0px 1px 3px ".concat(jsutils.get(buildColorStyles.colors, 'opacity._50')),
          marginLeft: 0,
          cursor: 'pointer',
          height: height$1,
          width: width$1,
          position: 'absolute',
          top: 0,
          left: 0
        }, transition('left', 0.2))
      },
      on: {
        $web: {
          left: width$1,
          boxShadow: "1px 1px 3px ".concat(jsutils.get(buildColorStyles.colors, 'opacity._50')),
          backgroundColor: jsutils.get(buildColorStyles.colors, 'surface.primary.colors.main')
        }
      }
    },
    disabled: {
      opacity: 0.4
    }
  }
};
var switchClose = jsutils.deepMerge(switchDefault, {
  main: {
    $all: {
      justifyContent: 'flex-start'
    }
  },
  content: {
    left: {
      flex: 'none',
      marginRight: '10px',
      textAlign: 'inherit'
    },
    right: {
      flex: 'none',
      marginLeft: '10px',
      textAlign: 'inherit'
    }
  }
});
var switchStyles = {
  default: switchDefault,
  close: switchClose
};

var form$1 = {
  checkbox: checkbox,
  checkGroup: checkGroup,
  form: form,
  input: input,
  option: option,
  radio: radio,
  select: select,
  switch: switchStyles
};

var layout = {
  full: {
    width: {
      width: '100%'
    },
    height: {
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  },
  grid: {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: '100%'
    },
    row: {
      flexWrap: 'wrap',
      minWidth: '100%'
    },
    column: {
      flexWrap: 'wrap'
    },
    columns: 12
  }
};

var transform = {
  rotate: {
    at: function at(amount) {
      return {
        transform: "rotate(".concat(amount, "deg)")
      };
    },
    45: {
      transform: 'rotate(45deg)'
    },
    90: {
      transform: 'rotate(90deg)'
    },
    180: {
      transform: 'rotate(180deg)'
    },
    270: {
      transform: 'rotate(270deg)'
    }
  }
};

var defaults$9 = buildColorStyles.getThemeDefaults();
var fontDefs = jsutils.get(defaults$9, 'font', {
  components: {}
});
var compFontDefs = fontDefs.components;
var typography = {
  font: {
    family: {
      $native: {},
      $web: {
        fontFamily: fontDefs.family || 'Verdana, Geneva, sans-serif'
      }
    }
  },
  default: {
    color: buildColorStyles.colors.opacity._85,
    fontSize: fontDefs.size || 16,
    letterSpacing: fontDefs.spacing || 0.15,
    margin: 0
  },
  caption: _rollupPluginBabelHelpers._objectSpread2({
    color: buildColorStyles.colors.opacity._60,
    fontSize: 12,
    letterSpacing: 0.4
  }, compFontDefs.caption),
  h1: _rollupPluginBabelHelpers._objectSpread2({
    fontWeight: '300',
    fontSize: 40,
    letterSpacing: -1.5
  }, compFontDefs.h1),
  h2: _rollupPluginBabelHelpers._objectSpread2({
    fontWeight: '300',
    fontSize: 32,
    letterSpacing: -0.5
  }, compFontDefs.h2),
  h3: _rollupPluginBabelHelpers._objectSpread2({
    color: buildColorStyles.colors.opacity._60,
    fontSize: 28
  }, compFontDefs.h3),
  h4: _rollupPluginBabelHelpers._objectSpread2({
    fontSize: 24,
    letterSpacing: 0.25
  }, compFontDefs.h4),
  h5: _rollupPluginBabelHelpers._objectSpread2({
    fontSize: 20,
    marginBottom: margin.size
  }, compFontDefs.h5),
  h6: _rollupPluginBabelHelpers._objectSpread2({
    color: buildColorStyles.colors.opacity._60,
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: '500'
  }, compFontDefs.h6),
  label: _rollupPluginBabelHelpers._objectSpread2({
    minWidth: '100%',
    fontSize: 14,
    letterSpacing: 0.15,
    fontWeight: '700',
    marginBottom: margin.size / 4
  }, compFontDefs.label),
  paragraph: _rollupPluginBabelHelpers._objectSpread2({
    fontSize: fontDefs.size || 16,
    letterSpacing: 0.5,
    marginBottom: margin.size,
    lineHeight: 20
  }, compFontDefs.paragraph),
  subtitle: _rollupPluginBabelHelpers._objectSpread2({
    fontSize: 14,
    letterSpacing: fontDefs.spacing || 0.15
  }, compFontDefs.subtitle)
};

var theme = _rollupPluginBabelHelpers._objectSpread2({
  colors: buildColorStyles.colors,
  display: display,
  flex: flex,
  form: form$1,
  helpers: helpers,
  layout: layout,
  margin: margin,
  padding: padding,
  transform: transform,
  transition: transition,
  typography: typography
}, components);

exports.theme = theme;
//# sourceMappingURL=theme.js.map