/**
 * @description Get user browser version and system information
 * @param {string='vi-vn' | 'en'} lang Return information in Chinese or English
 * @constructor
 */
export default function BrowserType(lang: 'vi-vn' | 'en' = 'en') {
  // Priority: System + System version > Platform > Engine + Supporter + Engine version + Supporter version > Shell + Shell version
  const ua = navigator.userAgent.toLowerCase();
  const testUa = (regexp) => regexp.test(ua);
  const testVs = (regexp) =>
    ua
      .match(regexp)
      ?.toString()
      .replace(/[^0-9|_.]/g, '')
      .replace(/_/g, '.');
  // System
  const system =
    new Map([
      [testUa(/windows|win32|win64|wow32|wow64/g), 'windows'], // Windows system
      [testUa(/macintosh|macintel/g), 'macos'], // macOS system
      [testUa(/x11/g), 'linux'], // Linux system
      [testUa(/android|adr/g), 'android'], // Android system
      [testUa(/ios|iphone|ipad|ipod|iwatch/g), 'ios'], // iOS system
    ]).get(true) || 'unknown';

  // System version
  const systemVs =
    new Map([
      [
        'windows',
        new Map([
          [testUa(/windows nt 5.0|windows 2000/g), '2000'],
          [testUa(/windows nt 5.1|windows xp/g), 'xp'],
          [testUa(/windows nt 5.2|windows 2003/g), '2003'],
          [testUa(/windows nt 6.0|windows vista/g), 'vista'],
          [testUa(/windows nt 6.1|windows 7/g), '7'],
          [testUa(/windows nt 6.2|windows 8/g), '8'],
          [testUa(/windows nt 6.3|windows 8.1/g), '8.1'],
          [testUa(/windows nt 10.0|windows 10/g), '10'],
        ]).get(true),
      ],
      ['macos', testVs(/os x [\d._]+/g)],
      ['android', testVs(/android [\d._]+/g)],
      ['ios', testVs(/os [\d._]+/g)],
    ]).get(system) || 'unknown';

  // Platform
  let platform = 'unknown';
  if (system === 'windows' || system === 'macos' || system === 'linux') {
    platform = 'desktop'; // Desktop platform
  } else if (system === 'android' || system === 'ios' || testUa(/mobile/g)) {
    platform = 'mobile'; // Mobile platform
  }
  // Engine and Supporter
  const [engine = 'unknown', supporter = 'unknown'] = new Map([
    [
      testUa(/applewebkit/g),
      [
        'webkit',
        new Map([
          // Webkit engine
          [testUa(/safari/g), 'safari'], // Safari browser
          [testUa(/chrome/g), 'chrome'], // Chrome browser
          [testUa(/opr/g), 'opera'], // Opera browser
          [testUa(/edge/g), 'edge'], // Edge browser
        ]).get(true),
      ] || 'unknown',
    ], // [Webkit engine, xxx browser]
    [testUa(/gecko/g) && testUa(/firefox/g), ['gecko', 'firefox']], // [Gecko engine, Firefox browser]
    [testUa(/presto/g), ['presto', 'opera']], // [Presto engine, Opera browser]
    [testUa(/trident|compatible|msie/g), ['trident', 'iexplore']], // [Trident engine, Internet Explorer browser]
  ]).get(true) || ['unknown', 'unknown'];

  // Engine version
  const engineVs =
    new Map([
      ['webkit', testVs(/applewebkit\/[\d._]+/g)],
      ['gecko', testVs(/gecko\/[\d._]+/g)],
      ['presto', testVs(/presto\/[\d._]+/g)],
      ['trident', testVs(/trident\/[\d._]+/g)],
    ]).get(engine) || 'unknown';

  // Supporter version
  const supporterVs =
    new Map([
      ['firefox', testVs(/firefox\/[\d._]+/g)],
      ['opera', testVs(/opr\/[\d._]+/g)],
      ['iexplore', testVs(/(msie [\d._]+)|(rv:[\d._]+)/g)],
      ['edge', testVs(/edge\/[\d._]+/g)],
      ['safari', testVs(/version\/[\d._]+/g)],
      ['chrome', testVs(/chrome\/[\d._]+/g)],
    ]).get(supporter) || 'unknown';

  // Shell and Shell version
  const [shell = 'none', shellVs = 'unknown'] = new Map([
    [testUa(/micromessenger/g), ['wechat', testVs(/micromessenger\/[\d._]+/g)]], // [WeChat browser,]
    [testUa(/qqbrowser/g), ['qq', testVs(/qqbrowser\/[\d._]+/g)]], // [QQ browser,]
    [testUa(/ucbrowser/g), ['uc', testVs(/ucbrowser\/[\d._]+/g)]], // [UC browser,]
    [testUa(/qihu 360se/g), ['360', 'unknown']], // [360 browser (no version),]
    [testUa(/2345explorer/g), ['2345', testVs(/2345explorer\/[\d._]+/g)]], // [2345 browser,]
    [testUa(/metasr/g), ['sougou', 'unknown']], // [Sogou browser (no version),]
    [testUa(/lbbrowser/g), ['liebao', 'unknown']], // [Liebao browser (no version),]
    [testUa(/maxthon/g), ['maxthon', testVs(/maxthon\/[\d._]+/g)]], // [Maxthon browser,]
  ]).get(true) || ['none', 'unknown'];

  return {
    'zh-cn': Object.assign(
      {
        内核: engine, // Engine: webkit gecko presto trident
        内核版本: engineVs, // Engine version
        平台: platform, // Platform: desktop mobile
        载体: supporter, // Supporter: chrome safari firefox opera iexplore edge
        载体版本: supporterVs, // Supporter version
        系统: system, // System: windows macos linux android ios
        系统版本: systemVs, // System version
      },
      shell === 'none'
        ? {}
        : {
            外壳: shell, // Shell: wechat qq uc 360 2345 sougou liebao maxthon
            外壳版本: shellVs, // Shell version
          },
    ),
    en: Object.assign(
      {
        engine, // Engine: webkit gecko presto trident
        engineVs, // Engine version
        platform, // Platform: desktop mobile
        supporter, // Supporter: chrome safari firefox opera iexplore edge
        supporterVs, // Supporter version
        system, // System: windows macos linux android ios
        systemVs, // System version
      },
      shell === 'none'
        ? {}
        : {
            shell, // Shell: wechat qq uc 360 2345 sougou liebao maxthon
            shellVs, // Shell version
          },
    ),
  }[lang];
}
