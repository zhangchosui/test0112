$(window).on("load", function () {

  /** 共通css. */
  const commonCssFiles = {
    reset: "css-wipe.css",
    plugin: {
      modal: "jquery-modal.min.css",
      slick: "slick.css",
    },
    device: {
      pc: [
        "base.css",
        "layout.css",
        "block.css",
        "element.css"
      ],
      tablet: [
        "base.css",
        "layout.css",
        "block.css",
        "element.css"
      ],
      sp: [
        "base.css",
        "layout.css",
        "block.css",
        "element.css"
      ]
    }
  };

  /** 共通js. */
  const pluginJsFiles = {
    modal: "jquery-modal.min.js",
    slick: "slick.min.js",
//    lottie: [
//      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js",
//      "lottie.min.js"
//    ]
  };

  /** 共通部品. */
  const commonParts = {
    header: {
      className: "js_header",
      commentTag: "##import_header##",
      filePath: "../../../src/compornents/header.html"
    },
    global_navigation_pc: {
      className: "js_gNav_pc",
      commentTag: "##import_global_navigation_pc##",
      filePath: "../../../src/compornents/global_navigation_pc.html"
    },
    global_navigation_sp: {
      className: "js_gNav_sp",
      commentTag: "##import_global_navigation_sp##",
      filePath: "../../../src/compornents/global_navigation_sp.html"
    },
    footer: {
      className: "js_footer",
      commentTag: "##import_footer##",
      filePath: "../../../src/compornents/footer.html"
    }
  };

  // 初期化
  initialize();

  /**
   * 初期化.
   * <pre>
   * 共通CSSファイル、共通部品の読み込み。
   * </pre>
   * @returns {void}
   */
  function initialize() {

    // 共通css読み込み
    importCommonCssFile();

    // ページcss読み込み
    importPageCssFile();

    // 共通js読み込み
    importCommonJsFile();

    // 共通部品読み込み
    importCommonCompornentFile();
  }

  /**
   * 共通css読み込み.
   * @returns {void}
   */
  function importCommonCssFile() {
    $.each(commonCssFiles, function (key, value) {
      if ("reset" === key) {
        // 初期化CSS

        $linkTag = $("<link>").attr({
          "rel": "stylesheet",
          "href": `../../../src/prod_styles/${value}`
        });
        $linkTag.insertAfter($("meta[name ='viewport']"));
      } else if ("plugin" === key) {
        // プラグインCSS

        $.each(value, function (key, value) {
          $linkTag = $("<link>").attr({
            "rel": "stylesheet",
            "href": `../../../prod_assets/js/plugin/${key}/${value}`
          });
          $("head").append($linkTag);
        });
      } else {
        // 共通CSS

        $.each(value, function (key, files) {
          $.each(files, function (index, value) {
            $linkTag = $("<link>").attr({
              "rel": "stylesheet",
              "href": `../../../src/prod_styles/common/${key}/${value}`
            });
            if ("pc" === key) {
              $linkTag.attr("media", "screen and (min-width:1025px)");
            } else if ("tablet" === key) {
              $linkTag.attr("media", "screen and (min-width:521px) and (max-width:1024px)");
            } else {
              $linkTag.attr("media", "screen and (max-width:520px)");
            }
            $("head").append($linkTag);
          });
        });
      }
    });
  }

  /**
   * ページ毎の共通css、ページcss読み込み.
   * @returns {void}
   */
  function importPageCssFile() {
    var $pageUrl = location.href
            .substring(location.href.lastIndexOf("/") + 1);

    var pageId = $pageUrl.substring(0, $pageUrl.indexOf(".")).replace("index_", "");
    var functionId = pageId.substring(0, pageId.indexOf("_"));

    $("body").addClass(`${functionId} ${pageId}`);
    $.each(commonCssFiles, function (key, value) {
      if ("device" === key) {
        $.each(value, function (device) {
          var commonFile = `../../../src/prod_styles/pages/${functionId}/${device}/common.css`;
          var pageFile = `../../../src/prod_styles/pages/${functionId}/${device}/${pageId}.css`;
          // page common css file
          asyncImportFile(device, commonFile);

          // page css file
          asyncImportFile(device, pageFile);
        });
      }
    });
  }

  /**
   * 共通js読み込み.
   * @returns {void}
   */
  function importCommonJsFile() {
     $.each(pluginJsFiles, function (name, values) {
        if ($.isArray(values)) {
          $.each(values, function(index, value) {

            var $scriptTag = $("<script>").attr({
              "type": "text/javascript",
              "src": `../../../prod_assets/js/plugin/${name}/${value}`
            });

            if (!value.search("http")) {
              $scriptTag.attr("src", value);
            }
            $scriptTag.insertBefore($("script[id ='commonJs']"));
          });
        } else {
          var $scriptTag = $("<script>").attr({
            "type": "text/javascript",
            "src": `../../../prod_assets/js/plugin/${name}/${values}`
          });
          $scriptTag.insertBefore($("script[id ='commonJs']"));
        }
     });
  }

  /**
   * (Ajax)ファイル読み込み.
   * @param {string} device デバイスタイプ
   * @param {string} file 読み込み対象ファイル
   * @returns {void}
   */
  function asyncImportFile(device, file) {
    $.ajax({
      url: file,
      cache: false,
      async: false
    })
    .done(function (data) {
      $linkTag = $("<link>").attr({
        "rel": "stylesheet",
        "href": file
      });

      if ("pc" === device) {
        $linkTag.attr("media", "screen and (min-width:1025px)");
      } else if ("tablet" === device) {
        $linkTag.attr("media", "screen and (min-width:521px) and (max-width:1024px)");
      } else {
        $linkTag.attr("media", "screen and (max-width:520px)");
      }
      $("head").append($linkTag);
    });
  }

  /**
   * 共通部品の読み込み.
   * @returns {void}
   */
  function importCommonCompornentFile() {

    var curNode;
    var it = document.createNodeIterator(document.body, NodeFilter.SHOW_COMMENT);
    var $html = $("body").html();

    while (curNode = it.nextNode()) {
      $nodeParth = $.trim(curNode.nodeValue);

      if ($nodeParth.startsWith("##")
              && $nodeParth.endsWith("##")) {

        var tag = $nodeParth.replace("import_", "").replace(/##/g, "");

        $.each(commonParts, function (parts, colums) {
          if (parts === tag) {
            var importClass = `js_import_${tag}`;
            $html = $html.replace("<!-- " + colums.commentTag + " -->", `<div class="${importClass}"></div>`);
            return false;
          }
        });

      }
    }
    $("body").html($html);

    $.each(commonParts, function (parts, colums) {
      var tag = "js_" + colums.commentTag.replace(/##/g, "");
      $(`.${tag}`).load(colums.filePath, function (data, status) {
        if ("success" === status) {
          $(`.${colums.className}`).unwrap();
        }
      });

    });
  }

  /* modal */
  $(".js_modal").on("click", function () {
    event.preventDefault();
    this.blur();
    $("body").append(createModalCloseTag());
    $.get(this.href, function (html) {
      $(html).appendTo("body").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false,
        blockerClass: "js_modalBlocker"
      })
      .off($.modal.AFTER_CLOSE)
      .on($.modal.AFTER_CLOSE, function (event, modal) {
        $(".js_modal01_close").remove();
        $.modal.close();
        $(this).remove();
      });
    });
  });

  function createModalCloseTag() {
    var close = '<div class="bl_modal01 hp_spTb js_modal01_close">'
            + '<div class="bl_modal01_close">'
            + '<a href="#" rel="modal:close">&times;</a>'
            + '</div>'
            + '</div>';
    return close;
  }
});
