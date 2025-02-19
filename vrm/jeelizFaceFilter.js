/**
 * Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
 *
 * Copyright 2018 Jeeliz ( https://jeeliz.com )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var JEEFACEFILTERAPI = (function () {
    window.JEEFACEFILTERAPIGEN = function () {
        function zb() {
            var a = null, c = null, d = null, e = 0;
            this.jd = function (f) {
                return a[f]
            };
            this.Jd = function (f) {
                var k = null;
                e = f.length;
                a = f.map(function (l, n) {
                    l = Object.assign({}, l, {index: n, parent: this, Na: k, sd: n === e - 1});
                    return k = n = 0 === n ? Lb.instance(l) : Mb.instance(l)
                });
                c = a[0];
                d = a[e - 1];
                a.forEach(function (l, n) {
                    0 !== n && l.Ed()
                })
            };
            this.I = function (f, k) {
                var l = k;
                a.forEach(function (n) {
                    l = n.I(l, f)
                });
                return l
            };
            this.Rb = function () {
                return c.A()
            };
            this.Tb = function () {
                return d.kd()
            };
            this.Ld = function (f) {
                d.Tc(f)
            };
            this.Qb = function () {
                return d.Qb()
            };
            this.h = function () {
                a && (a.forEach(function (f) {
                    f.h()
                }), d = c = a = null, e = 0)
            }
        }

        var Ma, Na, Oa, Xa, Ya, Pa, Za, $a, ab, bb, jb, kb, lb, mb;

        function nb(a, c) {
            var d = c % 8;
            return a[(c - d) / 8] >> 7 - d & 1
        }

        function Nb(a) {
            var c = JSON.parse(a);
            a = c.ne;
            var d = c.nf, e = c.n;
            var f = "undefined" === typeof btoa ? Buffer.from(c.data, "base64").toString("latin1") : atob(c.data);
            var k = f.length;
            c = new Uint8Array(k);
            for (var l = 0; l < k; ++l) c[l] = f.charCodeAt(l);
            f = new Float32Array(e);
            k = new Float32Array(d);
            l = a + d + 1;
            for (var n = 0; n < e; ++n) {
                for (var p =
                    l * n, y = 0 === nb(c, p) ? 1 : -1, m = p + 1, r = 1, x = 0, z = m + a - 1; z >= m; --z) x += r * nb(c, z), r *= 2;
                m = x;
                p = p + 1 + a;
                r = k.length;
                x = 0;
                for (z = p; z < p + r; ++z) k[x] = nb(c, z, !0), ++x;
                for (r = p = 0; r < d; ++r) p += k[r] * Math.pow(2, -r - 1);
                f[n] = 0 === p && 0 === m ? 0 : y * (1 + p) * Math.pow(2, 1 + m - Math.pow(2, a - 1))
            }
            return f
        }

        function ob() {
            return -1 !== [ba.play, ba.pause].indexOf(ea)
        }

        function Ob(a) {
            if (ea !== ba.pause) {
                var c = ea === ba.play ? H.Aa : I.Dc;
                cb = setTimeout(Ab.bind(null, a), c)
            }
        }

        function pb() {
            if (ea === ba.play) return !1;
            ea = ba.play;
            P.timestamp = Date.now();
            Qa && window.cancelAnimationFrame(Qa);
            Ab(0)
        }

        function Bb() {
            if (ea !== ba.play) return !1;
            cb && (clearTimeout(cb), cb = null);
            Qa && (window.cancelAnimationFrame(Qa), Qa = null);
            ea = ba.pause;
            return !0
        }

        function Ca(a, c, d, e, f) {
            a = 4 * (3 * c + a) + d;
            return e + (U.buffer[a] / 255 + U.buffer[a + 12] / 65025) * (f - e)
        }

        function Cb() {
            ra.U();
            Q.reset();
            R.reset();
            t.ka();
            t.Kb();
            b.disable(b.DEPTH_TEST);
            b.disable(b.BLEND);
            Q.oa();
            t.xa()
        }

        function Ab() {
            if (ea !== ba.pause) {
                t.Kb();
                Q.reset();
                Q.oa();
                b.disable(b.DEPTH_TEST);
                ra.U();
                t.xa();
                if (!u.jb) {
                    var a = u.element.currentTime - u.Oa;
                    0 > a && (u.Oa = u.element.currentTime);
                    1E3 * a < I.Yd || (u.aa.refresh(), u.Oa += a, t.set("s48"), u.ba.J(), u.aa.b(0), Q.g(!1, !1))
                }
                if (E.L.length > P.G) E.L.splice(0, E.L.length - P.G); else for (; E.L.length < P.G;) E.L.push(0);
                if (1 !== E.i) if (ma.every(qb)) {
                    for (var c = 0, d = a = 0; d < ma.length; ++d) ma[d].detected > c && (c = ma[d].detected, a = 0);
                    for (c = 0; c < P.G; ++c) E.L[c] = a
                } else {
                    a = E.bc;
                    c = 0;
                    for (d = !1; c < P.G; ++c) {
                        if (qb(ma[a])) if (d) {
                            do ++a === E.i && (a = 0); while (qb(ma[a]))
                        } else d = !0;
                        E.L[c] = a++;
                        a >= E.i && (a = 0)
                    }
                    E.bc = a
                }
                for (a = 0; a < P.G; ++a) E.Z = E.L[a], E.ob = (.5 + E.Z) / E.i, E.Zb = E.L.lastIndexOf(E.Z) ===
                    a, t.set("s49"), H.ga && t.B("u37", ma[E.Z].rz), 1 !== E.i && t.B("u36", E.ob), V.Ga.J(), u.ba.b(0), U.Qa.b(1), Q.g(!1, !1), V.Ga.b(0), za.I(!1, V.Ga);
                a = Date.now();
                P.ra = a - P.timestamp;
                P.timestamp = a;
                -1 !== X.nDetectsPerLoop ? P.G = X.nDetectsPerLoop : (a = I.Ta, P.fc = P.ec / P.ra, P.hc = P.fc * a + P.hc * (1 - a), P.jc = 1E3 / P.ra, P.ia = P.jc * I.Ta + P.ia * (1 - I.Ta), P.ia > I.ea[1] ? (a = I.za[1], 1 < E.i && (++a, c = ma.filter(Pb).length, a *= Math.max(1, c)), P.G = Math.min(P.G + 1, a), P.ia = (I.ea[0] + I.ea[1]) / 2) : P.ia < I.ea[0] && (P.G = Math.max(P.G - 1, I.za[0]), P.ia = (I.ea[0] + I.ea[1]) /
                    2));
                ra.F();
                b.viewport(0, 0, 3, 2 * E.i);
                t.set("s47");
                U.Qa.b(0);
                Q.g(!1, !1);
                b.readPixels(0, 0, 3, 2 * E.i, b.RGBA, b.UNSIGNED_BYTE, U.buffer);
                for (a = 0; a < E.i; ++a) if (-1 !== E.L.indexOf(a)) {
                    var e = a;
                    c = Ua[e];
                    var f = [e];
                    d = ma[e];
                    var k = rb[e], l = 2 * e;
                    c.Da = Ca(1, l, 3, 0, 1);
                    d.detected = pa.P(d.detected, c.Da, I.Ac);
                    if (c.Da < I.mb) H.ga && (d.rz = 0); else {
                        var n = U.ya;
                        c.x = Ca(0, l, 1, -1, 1);
                        c.y = Ca(0, l, 2, -1, 1);
                        c.T = Ca(0, l, 3, 0, 1);
                        c.rb = Ca(1, l, 0, -n[0], n[0]);
                        c.sb = Ca(1, l, 1, -n[1], n[1]);
                        c.va = Ca(1, l, 2, -n[2], n[2]);
                        for (n = 0; n < U.R; ++n) c.Mb[n] = U.ta[n](Ca(2, l, n, 0,
                            1));
                        f.Za = c.x - d.x;
                        f.$a = c.y - d.y;
                        f.Ya = c.T - d.s;
                        f.Va = c.rb - d.rx;
                        f.Wa = c.sb - d.ry;
                        f.Xa = H.ga ? c.va : c.va - d.rz;
                        f = (1 - db.Ia(sa.translationFactorRange[0], sa.translationFactorRange[1], Math.sqrt(f.Za * f.Za + f.$a * f.$a + f.Ya * f.Ya) / P.ra)) * (1 - db.Ia(sa.rotationFactorRange[0], sa.rotationFactorRange[1], Math.sqrt(f.Va * f.Va + f.Wa * f.Wa + f.Xa * f.Xa) / P.ra)) * db.Ia(sa.qualityFactorRange[0], sa.qualityFactorRange[1], c.Da);
                        e = k[++sb[e] % k.length] = f;
                        for (l = 0; l < k.length; ++l) e = Math.min(e, k[l]);
                        e = Math.max(.5, e);
                        f = Math.min(e, f);
                        k = pa.P(sa.alphaRange[1],
                            sa.alphaRange[0], Math.pow(f, I.Cc));
                        d.x = pa.P(d.x, c.x, k);
                        d.y = pa.P(d.y, c.y, k);
                        d.s = pa.P(d.s, c.T, k);
                        d.rx = pa.P(d.rx, c.rb, k);
                        d.ry = pa.P(d.ry, c.sb, k);
                        d.rz = H.ga ? d.rz + k * c.va : pa.P(d.rz, c.va, k);
                        k = Math.max(k, I.Bc);
                        for (e = 0; e < U.R; ++e) d.expressions[e] = pa.P(d.expressions[e], c.Mb[e], k);
                        ++c.La
                    }
                }
                ra.Wd();
                ra.reset();
                R.reset();
                b.enable(b.DEPTH_TEST);
                H.Ca && (1 === E.i ? H.Ca(ma[0]) : H.Ca(ma));
                b.disable(b.BLEND);
                ea === ba.play && (Qa = window.requestAnimationFrame(Ob))
            }
        }

        function Qb() {
            function a(d) {
                for (var e = [], f = 0; f < E.i; ++f) e.push(JSON.parse(JSON.stringify(d)));
                return e
            }

            u.ba = R.instance({isPot: !1, isLinear: !0, isFloat: !1, width: V.M, height: V.O});
            V.Ga = R.instance({isPot: !0, isFloat: !1, width: za.Rb()});
            var c = {
                width: 3, height: E.i, isFloat: !0, isPot: !1, array: function (d) {
                    for (var e = new Float32Array(d.length * E.i), f = 0, k; f < E.i; ++f) for (k = 0; k < d.length; ++k) e[f * d.length + k] = d[k];
                    return e
                }(new Float32Array([0, X.borderWidth, X.borderHeight, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
            };
            U.Qa = Rb.instance(c);
            U.buffer = new Uint8Array(8 * c.width * E.i);
            Ua = a({
                Da: 0, x: 0, y: 0, T: 1, rb: 0, sb: 0, va: 0, Mb: new Float32Array(U.R),
                La: 0
            });
            ma = a({detected: 0, x: 0, y: 0, s: 1, rx: 0, ry: 0, rz: 0, expressions: new Float32Array(U.R)});
            a({Za: 0, $a: 0, Ya: 0, Va: 0, Wa: 0, Xa: 0})
        }

        function tb() {
            t.K("s49", [{type: "1i", name: "u1", value: 0}, {type: "1i", name: "u34", value: 1}, {
                type: "2f",
                name: "u35",
                value: V.v
            }, {type: "1f", name: "u36", value: .5}, {type: "1f", name: "u37", value: 0}]);
            t.K("s50", [{type: "1i", name: "u38", value: 0}, {type: "1i", name: "u34", value: 1}, {
                type: "1f",
                name: "u41",
                value: I.Ud
            }, {type: "1f", name: "u42", value: I.xc}, {type: "1f", name: "u43", value: I.wc}, {
                type: "3f", name: "u40",
                value: [U.ca[0] * V.v[0], U.ca[1] * V.v[1], U.ca[2]]
            }, {type: "1f", name: "u36", value: .5}, {type: "1f", name: "u44", value: 1}, {
                type: "1f",
                name: "u37",
                value: 0
            }]);
            var a = [{type: "1i", name: "u38", value: 0}];
            t.K("s51", a);
            t.K("s52", a);
            t.K("s47", [{type: "1i", name: "u34", value: 0}, {type: "1f", name: "u47", value: V.v[0]}, {
                type: "2f",
                name: "u46",
                value: [0, .5 / E.i]
            }])
        }

        function ub() {
            var a = za.Rb(), c = V.M / a;
            Pa = X.minScale * c;
            Za = X.maxScale * c;
            $a = (1 - 2 * X.borderWidth) / X.nStepsX;
            ab = (1 - 2 * X.borderHeight) / X.nStepsY;
            bb = (Za - Pa) / X.nStepsScale;
            jb = X.borderWidth;
            kb = X.borderHeight;
            lb = 1 - X.borderWidth;
            mb = 1 - X.borderHeight;
            V.v[0] = a / V.M;
            V.v[1] = a / V.O;
            Ma = X.borderWidth;
            Na = X.borderHeight;
            Oa = Pa;
            Xa = X.borderWidth;
            Ya = X.borderHeight;
            vb = Pa
        }

        function Sb(a) {
            if (H.la) Db("string" === typeof H.la ? JSON.parse(H.la) : H.la, a); else {
                var c = H.xb;
                "JSON" !== c.toUpperCase().split(".").pop() && (c += I.save);
                Eb.get(c, function (d) {
                    d = JSON.parse(d);
                    Db(d, a)
                })
            }
        }

        function Db(a, c) {
            if (a.exportData) {
                var d = a.exportData;
                d.thetaXYZfactor && (U.ya = d.thetaXYZfactor);
                d.trackingDxysFactor && (U.ca = d.trackingDxysFactor);
                "undefined" !== typeof d.nExpressions && (U.R = d.nExpressions)
            }
            U.R || (U.R = I.ic);
            if (!U.ta) for (U.ta = [], d = 0; d < U.R; ++d) U.ta.push(I.cd);
            c(a)
        }

        function Tb() {
            if (Aa.o({
                Ua: H.V, width: V.M, height: V.O, debug: !1, kc: function () {
                    Da("GLCONTEXT_LOST")
                }, antialias: !0, premultipliedAlpha: !0
            })) {
                if (Aa.pd()) return !0;
                Da("GL_INCOMPATIBLE");
                return !1
            }
            Da("GL_INCOMPATIBLE");
            return !1
        }

        function qb(a) {
            return a.detected <= I.mb
        }

        function Pb(a) {
            return a.detected > I.mb
        }

        function Fb(a, c, d, e) {
            return d > a ? Math.max(0, a + c / 2 - (d - e / 2)) : Math.max(0, d + e / 2 - (a -
                c / 2))
        }

        function Ub() {
            return Ua.some(function (a, c) {
                if (c === E.Z) return !1;
                c = Ua[E.Z];
                if (c.La > a.La || 3 > a.La || Fb(c.x, c.T, a.x, a.T) < I.cc * c.T) return !1;
                var d = V.M / V.O;
                return Fb(c.y, c.T * d, a.y, a.T * d) > I.cc * c.T * d
            })
        }

        function Vb() {
            var a = E.Z;
            U.Qa.Nd(1);
            1 !== E.i && (b.viewport(0, 0, 3, E.i), t.set("s0"), t.qc("u1", 1), Q.g(!1, !1), t.qc("u1", 0));
            b.viewport(0, a, 1, 1);
            t.set("s50");
            H.ga && t.B("u37", ma[a].rz);
            1 !== E.i && t.B("u36", E.ob);
            if (1 < E.i) {
                var c = Ub() ? 0 : 1;
                t.B("u44", c)
            }
            t.Pd("u39", Xa, Ya, vb);
            Q.g(!1, !1);
            E.Zb && (b.viewport(1, a, 1, 1), t.set("s51"),
                Q.g(!1, !1), b.viewport(2, a, 1, 1), t.set("s52"), Q.g(!1, !1));
            Oa += bb;
            Oa > Za && (Ma += $a, Oa = Pa, Ma > lb && (Ma = jb, Na += ab, Na > mb && (Na = kb)));
            Xa = Ma + .5 * (Math.random() - .5) * $a;
            Ya = Na + .5 * (Math.random() - .5) * ab;
            vb = Oa + .5 * (Math.random() - .5) * bb
        }

        function Gb() {
            u.aa && u.aa.remove();
            u.aa = R.instance({D: u.element, isPot: !1, isFloat: !1, isFlipY: !0})
        }

        function Ga() {
            t.K("s48", [{type: "1i", name: "u1", value: 0}, {type: "mat2", name: "u33", value: u.m}])
        }

        function Ha() {
            u.C[0] = .5;
            u.C[1] = .5;
            var a = u.v[1] / u.v[0], c = Aa.N() / Aa.A();
            90 === Math.abs(ha.rotate) && (a =
                1 / a);
            a > c ? u.C[1] *= c / a : u.C[0] *= a / c;
            t.K("s50", [{name: "u45", type: "1f", value: c}]);
            u.m[0] = 0;
            u.m[1] = 0;
            u.m[2] = 0;
            u.m[3] = 0;
            switch (ha.rotate) {
                case 0:
                    u.m[0] = u.C[0];
                    u.m[3] = u.C[1];
                    break;
                case 180:
                    u.m[0] = -u.C[0];
                    u.m[3] = -u.C[1];
                    break;
                case 90:
                    u.m[1] = u.C[0];
                    u.m[2] = -u.C[1];
                    break;
                case -90:
                    u.m[1] = -u.C[0], u.m[2] = u.C[1]
            }
            ha.flipX && (u.m[0] *= -1, u.m[2] *= -1)
        }

        function wb() {
            var a = u.element.videoWidth, c = u.element.videoHeight, d = u.v[0] !== a || u.v[1] !== c;
            d && (u.v[0] = a, u.v[1] = c);
            return d
        }

        function eb(a, c) {
            if (ea === ba.error) return !1;
            u.element =
                a;
            wb();
            c && c();
            return !0
        }

        function Hb(a, c, d) {
            a && a();
            u.qa = {
                video: {
                    facingMode: {ideal: ha.facingMode},
                    width: {min: ha.minWidth, max: ha.maxWidth, ideal: ha.idealWidth},
                    height: {min: ha.minHeight, max: ha.maxHeight, ideal: ha.idealHeight}
                }, audio: !1
            };
            ha.deviceId && (u.qa.deviceId = ha.deviceId);
            S.get(u.element ? u.element : S.md(), function (e) {
                c && c(e);
                d(e)
            }, function () {
                Da("WEBCAM_UNAVAILABLE")
            }, u.qa)
        }

        function Da(a) {
            ea !== ba.error && (ea = ba.error, H.pa && H.pa(a))
        }

        function Ra(a, c) {
            for (var d in a) "undefined" !== typeof c[d] && (a[d] = c[d]);
            c === X && X.nDetectsPerLoop && (P.G = X.nDetectsPerLoop, P.ec = X.nDetectsPerLoop)
        }

        var pa = {
            Se: function (a) {
                return Math.ceil(Math.log2(a))
            }, vd: function (a) {
                return Math.log2(a)
            }, ef: function (a) {
                a = Math.log2(a);
                return a === Math.floor(a)
            }, ge: function (a) {
                var c = [0, 0, 0, 0];
                a.forEach(function (d) {
                    c[0] += d[0];
                    c[1] += d[1];
                    c[2] += d[2];
                    c[3] += d[3]
                });
                return c
            }, he: function (a, c, d) {
                return Math.min(Math.max(a, c), d)
            }, le: function (a) {
                return a * Math.PI / 180
            }, lf: function (a, c) {
                c = Math.pow(10, c);
                return Math.round(a * c) / c
            }, mf: function (a) {
                return Math.round(1E6 *
                    a) / 1E6
            }, Te: function (a, c) {
                return (100 * a / c).toFixed(3)
            }, P: function (a, c, d) {
                return a * (1 - d) + c * d
            }, Yc: function (a, c) {
                return pa.Pc(a - c)
            }, Pc: function (a) {
                for (; a > Math.PI;) a -= 2 * Math.PI;
                for (; a <= -Math.PI;) a += 2 * Math.PI;
                return a
            }, oe: function (a, c) {
                return Math.abs(pa.Yc(a, c))
            }, Zd: function (a, c) {
                return Math.atan2(Math.sin(a) + Math.sin(c), Math.cos(a) + Math.cos(c))
            }
        }, Eb = {
            get: function (a, c, d) {
                var e = new XMLHttpRequest;
                e.open("GET", a, !0);
                e.withCredentials = !1;
                e.onreadystatechange = function () {
                    4 === e.readyState && (200 === e.status || 0 ===
                    e.status ? c(e.responseText) : "undefined" !== typeof d && d(e.status))
                };
                e.send()
            }, Oe: function (a, c) {
                Eb.get(a, function (d) {
                    c(JSON.parse(d))
                })
            }, jf: function (a, c, d) {
                var e = new XMLHttpRequest;
                e.open("POST", a, !0);
                e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                e.onreadystatechange = function () {
                    4 !== e.readyState || 200 !== e.status && 0 !== e.status || d(e.responseText)
                };
                e.send(c)
            }, Fe: function (a, c) {
                var d = new XMLHttpRequest;
                d.open("POST", a, !0);
                d.responseType = "arraybuffer";
                d.onload = function () {
                    c(d.response)
                };
                d.send()
            }
        }, db = {
            zf: function (a, c, d) {
                a = Math.min(Math.max((d - a) / (c - a), 0), 1);
                return a * a * (3 - 2 * a)
            }, Ia: function (a, c, d) {
                return Math.min(Math.max((d - a) / (c - a), 0), 1)
            }, ze: function (a, c, d, e) {
                return Math.pow(Math.min(Math.max((e - a) / (c - a), 0), 1), d)
            }, Ef: function () {
                return 0
            }, hf: function () {
                return 1
            }, gf: function (a) {
                return a
            }, we: function (a) {
                return a * a
            }, Be: function (a) {
                return a * (2 - a)
            }, te: function (a) {
                return .5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a
            }, re: function (a) {
                return a * a * a
            }, Ae: function (a) {
                return --a * a * a + 1
            }, se: function (a) {
                return .5 > a ? 4 * a * a *
                    a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1
            }, xe: function (a) {
                return a * a * a * a
            }, Ce: function (a) {
                return 1 - --a * a * a * a
            }, ue: function (a) {
                return .5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a
            }, ye: function (a) {
                return a * a * a * a * a
            }, De: function (a) {
                return 1 + --a * a * a * a * a
            }, ve: function (a) {
                return .5 > a ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a
            }
        }, Wb = {
            fd: function (a, c, d) {
                switch (a) {
                    case "relu":
                        return d + "=max(vec4(0.,0.,0.,0.)," + c + ");";
                    case "elu":
                        return d + "=mix(exp(-abs(" + c + "))-vec4(1.,1.,1.,1.)," + c + ",step(0.," + c + "));";
                    case "elu01":
                        return d + "=mix(0.1*exp(-abs(" + c + "))-vec4(0.1,0.1,0.1,0.1)," +
                            c + ",step(0.," + c + "));";
                    case "arctan":
                        return d + "=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
                    case "copy":
                        return "";
                    default:
                        return !1
                }
            }
        }, t = function () {
            function a(g, w) {
                g = b.createShader(g);
                b.shaderSource(g, w);
                b.compileShader(g);
                return b.getShaderParameter(g, b.COMPILE_STATUS) ? g : !1
            }

            function c(g, w) {
                g = a(b.VERTEX_SHADER, g);
                w = a(b.FRAGMENT_SHADER, w);
                f.push(g, w);
                var A = b.createProgram();
                b.attachShader(A, g);
                b.attachShader(A, w);
                b.linkProgram(A);
                return A
            }

            function d(g) {
                void 0 === g.da && (g.da = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
                void 0 === g.Ba && (g.Ba = ["a0"]);
                void 0 === g.ma && (g.ma = [2]);
                if (void 0 === g.precision || "highp" === g.precision) g.precision = y;
                g.id = n++;
                void 0 !== g.Id && g.Id.forEach(function (A, Y) {
                    g.a = g.a.replace(A, g.Pa[Y])
                });
                g.wb = 0;
                g.ma.forEach(function (A) {
                    g.wb += 4 * A
                });
                g.ua = c(g.da, "precision " + g.precision + " float;\n" + g.a);
                g.j = {};
                g.c.forEach(function (A) {
                    g.j[A] = b.getUniformLocation(g.ua, A)
                });
                g.attributes = {};
                g.na = [];
                g.Ba.forEach(function (A) {
                    var Y = b.getAttribLocation(g.ua, A);
                    g.attributes[A] = Y;
                    g.na.push(Y)
                });
                if (g.f) {
                    b.useProgram(g.ua);
                    l = g;
                    k = g.id;
                    for (var w in g.f) b.uniform1i(g.j[w], g.f[w])
                }
                g.hb = !0
            }

            function e(g) {
                Ia.Od(G);
                k !== g.id && (G.ka(), k = g.id, l = g, b.useProgram(g.ua), g.na.forEach(function (w) {
                    0 !== w && b.enableVertexAttribArray(w)
                }))
            }

            var f = [], k = -1, l = null, n = 0, p = !1, y = "highp", m = ["u1"], r = ["u0"], x = {u1: 0}, z = {u0: 0},
                T = {u1: 0, u2: 1}, M = {u3: 0}, F = {
                    s0: {
                        a: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                        c: m,
                        f: x
                    },
                    s1: {
                        a: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                        c: m,
                        f: x,
                        precision: "lowp"
                    },
                    s2: {
                        a: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
                        c: ["u1", "u2"],
                        f: T
                    },
                    s3: {
                        a: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
                        c: m,
                        f: x
                    },
                    s4: {
                        a: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
                        c: ["u1", "mask"],
                        f: T
                    },
                    s5: {
                        a: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
                        c: m, f: x
                    },
                    s6: {
                        a: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
                        c: m,
                        f: x
                    },
                    s7: {
                        a: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
                        c: ["u0", "u4"],
                        f: z
                    },
                    s8: {
                        a: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}",
                        c: ["u0", "u4"],
                        f: z
                    },
                    s9: {
                        a: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
                        c: m, f: x
                    },
                    s10: {
                        a: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}",
                        c: ["u1", "u5", "u6"],
                        f: {u1: 0, u5: 1}
                    },
                    s11: {
                        a: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}",
                        c: ["u1", "u7"],
                        f: x
                    },
                    s12: {
                        a: "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
                        c: ["u1", "u8"], f: x
                    },
                    s13: {
                        a: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
                        c: r,
                        f: z
                    },
                    s14: {
                        a: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}",
                        c: r,
                        f: z
                    },
                    s15: {
                        a: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}",
                        c: r,
                        f: z
                    },
                    s16: {
                        a: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
                        c: r, f: z
                    },
                    s17: {
                        a: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
                        c: ["u0", "u6", "u9"],
                        f: {u0: 0, u6: 1, u9: 2}
                    },
                    s18: {
                        a: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
                        c: r,
                        f: z
                    },
                    s19: {
                        a: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
                        c: r, f: z
                    },
                    s20: {
                        a: "uniform sampler2D u0,u10;uniform float u11;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u10,f);float b=u11*u11;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",
                        c: ["u0", "u12", "u11"],
                        f: {u0: 0, u12: 1}
                    },
                    s21: {
                        a: "uniform sampler2D u1;uniform vec2 u13;varying vec2 vv0;void main(){float a=u13.x*u13.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u13.y),g=floor(u13.x*fract(b*u13.y)),f=(g*u13.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
                        c: ["u1", "u13"], f: x
                    },
                    s22: {
                        a: "uniform sampler2D u14,u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u16,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u14,b),e=texture2D(u15,c);gl_FragColor=d*e;}",
                        c: ["u14", "u15", "u16"],
                        f: {u15: 0, u14: 1, u16: 2}
                    },
                    s23: {
                        a: "uniform float u17;uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec2 a=fract(vv0*u17);vec4 b=texture2D(u14,vv0),c=texture2D(u15,a);gl_FragColor=b*c;}",
                        c: ["u15", "u14", "u17"],
                        f: {u15: 0, u14: 1}
                    },
                    s24: {
                        a: "uniform float u17;uniform sampler2D u14,u15,u18,u19,u20,u21;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u17,m=floor(i),c=i-m;vec4 n=texture2D(u14,vv0),d=texture2D(u15,c),a=texture2D(u21,vv0);a=a*255.;vec4 o=texture2D(u18,c),p=texture2D(u19,c),q=texture2D(u20,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
                        c: "u14 u15 u17 u21 u18 u19 u20".split(" "), f: {u15: 0, u14: 1, u21: 3, u18: 4, u19: 5, u20: 6}
                    },
                    s25: {
                        a: "uniform sampler2D u14,u15,u22;uniform float u17,u23,u24,u25;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u23*vv0),g=u23*vv0-a;float b=u17/u23;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u23;float l=u23*u25/u17;vec2 m=l*c,i=(m+d*u24)/u25,e=step(i,j);vec4 n=texture2D(u14,h),o=texture2D(u15,i),p=n*o*e.x*e.y,k=texture2D(u22,h);gl_FragColor=p*u24*u24+k;}",
                        c: "u14 u15 u17 u23 u24 u25 u22".split(" "),
                        f: {
                            u15: 0,
                            u14: 1, u22: 2
                        }
                    },
                    s26: {
                        a: "uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec4 a=texture2D(u14,vv0),b=texture2D(u15,vv0);gl_FragColor=a*b;}",
                        c: ["u14", "u15"],
                        f: {u15: 0, u14: 1}
                    },
                    s27: {
                        a: "uniform sampler2D u1,u22;uniform float u26;varying vec2 vv0;void main(){gl_FragColor=texture2D(u22,vv0)+u26*texture2D(u1,vv0);}",
                        c: ["u1", "u22", "u26"],
                        f: {u1: 0, u22: 1}
                    },
                    s28: {
                        a: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
                        c: m, f: x, precision: "lowp"
                    },
                    s29: {
                        a: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}",
                        c: ["u1", "u27"],
                        f: x,
                        precision: "lowp"
                    },
                    s30: {
                        a: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                        c: ["u1", "u27"], f: x, precision: "lowp"
                    },
                    s31: {
                        a: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
                        c: ["u1", "u2", "u28"], f: T
                    },
                    s32: {
                        a: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u28,a,b;float c,d,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)a=vec2(f,e),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,i+=d*texture2D(u1,b).r,g+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-i/g)*j;}",
                        c: ["u1", "u2", "u28"],
                        f: T
                    },
                    s33: {
                        a: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
                        c: ["u3", "u7"], f: M
                    },
                    s34: {
                        a: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
                        c: ["u3", "u7"],
                        f: M
                    },
                    s35: {
                        a: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
                        c: ["u1"], f: x, precision: "lowp"
                    },
                    s36: {
                        a: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
                        c: ["u7", "u1"],
                        f: x,
                        precision: "lowp"
                    },
                    s37: {
                        a: "uniform sampler2D u1,u29,u30;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u29,vv0),b=texture2D(u30,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
                        c: ["u1", "u29", "u30"], f: {u1: 0, u29: 1, u30: 2}
                    }
                }, D = {
                    s38: {
                        a: "uniform float u17,u31;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u22,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u17,xyTo=floor(vv0*u17+eps2);float weightSize=toSparsity*u17;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u31*(xyPatch-halfFromSparsity))/u17,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        c: ["u17", "u14", "u15", "u22", "u31"], Pa: ["1.1111", "gl_FragColor\\*=2.2222;"]
                    }, s39: {
                        a: "uniform float u17,u31,u25;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u22,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u25,xyTo=floor(vv0*u17+eps2);float weightSize=fromSparsity*u25;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u17;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u31*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u25,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        c: "u17 u25 u14 u15 u22 u31".split(" "), Pa: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
                    }
                }, G = {
                    kb: function () {
                        return p
                    }, o: function () {
                        if (!p) {
                            y = "highp";
                            for (var g in F) d(F[g], g);
                            t.set("s0");
                            b.enableVertexAttribArray(0);
                            g = Va.o();
                            p = !0;
                            return g
                        }
                    }, zc: function (g) {
                        g.forEach(function (w) {
                            G.zb(w)
                        })
                    }, zb: function (g) {
                        F[g.id] = g;
                        d(g, g.id)
                    }, Vb: function (g, w, A) {
                        w || (w = g);
                        F[w] = Object.create(D[g]);
                        F[w].rd = !0;
                        D[g].Pa && D[g].Pa.forEach(function (Y, na) {
                            F[w].a = F[w].a.replace(new RegExp(Y, "g"), A[na])
                        });
                        d(F[w], w)
                    }, set: function (g) {
                        e(F[g])
                    },
                    bd: function (g) {
                        return "undefined" === typeof F[g] ? !1 : F[g].hb
                    }, ka: function () {
                        -1 !== k && (k = -1, l.na.forEach(function (g) {
                            0 !== g && b.disableVertexAttribArray(g)
                        }))
                    }, ub: function () {
                        var g = 0;
                        l.na.forEach(function (w, A) {
                            A = l.ma[A];
                            b.vertexAttribPointer(w, A, b.FLOAT, !1, l.wb, g);
                            g += 4 * A
                        })
                    }, Kb: function () {
                        b.enableVertexAttribArray(0)
                    }, xa: function () {
                        b.vertexAttribPointer(l.na[0], 2, b.FLOAT, !1, 8, 0)
                    }, qc: function (g, w) {
                        b.uniform1i(l.j[g], w)
                    }, B: function (g, w) {
                        b.uniform1f(l.j[g], w)
                    }, wa: function (g, w, A) {
                        b.uniform2f(l.j[g], w, A)
                    }, tf: function (g,
                                     w) {
                        b.uniform2fv(l.j[g], w)
                    }, uf: function (g, w) {
                        b.uniform3fv(l.j[g], w)
                    }, Pd: function (g, w, A, Y) {
                        b.uniform3f(l.j[g], w, A, Y)
                    }, vf: function (g, w, A, Y, na) {
                        b.uniform4f(l.j[g], w, A, Y, na)
                    }, tb: function (g, w) {
                        b.uniform4fv(l.j[g], w)
                    }, wf: function (g, w) {
                        b.uniformMatrix2fv(l.j[g], !1, w)
                    }, xf: function (g, w) {
                        b.uniformMatrix3fv(l.j[g], !1, w)
                    }, yf: function (g, w) {
                        b.uniformMatrix4fv(l.j[g], !1, w)
                    }, K: function (g, w) {
                        G.set(g);
                        w.forEach(function (A) {
                            switch (A.type) {
                                case "4f":
                                    b.uniform4fv(l.j[A.name], A.value);
                                    break;
                                case "3f":
                                    b.uniform3fv(l.j[A.name],
                                        A.value);
                                    break;
                                case "2f":
                                    b.uniform2fv(l.j[A.name], A.value);
                                    break;
                                case "1f":
                                    b.uniform1f(l.j[A.name], A.value);
                                    break;
                                case "1i":
                                    b.uniform1i(l.j[A.name], A.value);
                                    break;
                                case "mat2":
                                    b.uniformMatrix2fv(l.j[A.name], !1, A.value);
                                    break;
                                case "mat3":
                                    b.uniformMatrix3fv(l.j[A.name], !1, A.value);
                                    break;
                                case "mat4":
                                    b.uniformMatrix4fv(l.j[A.name], !1, A.value)
                            }
                        })
                    }, Re: function () {
                        return "lowp"
                    }, h: function () {
                        b.disableVertexAttribArray(0);
                        G.ka();
                        for (var g in F) {
                            var w = F[g];
                            w.hb && (w.hb = !1, b.deleteProgram(w.ua));
                            w.rd && delete F[g]
                        }
                        f.forEach(function (A) {
                            b.deleteShader(A)
                        });
                        f.splice(0);
                        n = 0;
                        p = !1
                    }
                };
            return G
        }(), b = null, Aa = function () {
            function a(m) {
                console.log("ERROR in ContextFeedForward: ", m);
                return !1
            }

            function c() {
                if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) return !0;
                if (/(Mac)/i.test(navigator.platform)) {
                    var m;
                    (m = navigator.userAgent) ? (m = m.match(/Mac OS X (\d+)_(\d+)/) || m.match(/Mac OS X (\d+).(\d+)/), m = !m || 3 > m.length ? !1 : [parseInt(m[1], 10), parseInt(m[2], 10)]) : m = !1;
                    if (m && 10 === m[0] && 15 === m[1]) return !0
                }
                return !1
            }

            var d = null, e = null, f = null, k = null, l = !0, n = null,
                p = null, y = {
                    A: function () {
                        return d.width
                    }, N: function () {
                        return d.height
                    }, Ie: function () {
                        return d
                    }, He: function () {
                        return b
                    }, u: function () {
                        return l
                    }, flush: function () {
                        b.flush()
                    }, hd: function () {
                        n || (n = new Uint8Array(d.width * d.height * 4));
                        b.readPixels(0, 0, d.width, d.height, b.RGBA, b.UNSIGNED_BYTE, n);
                        return n
                    }, Ke: function () {
                        return d.toDataURL("image/jpeg")
                    }, Le: function () {
                        ra.F();
                        e || (e = document.createElement("canvas"), f = e.getContext("2d"));
                        e.width = d.width;
                        e.height = d.height;
                        for (var m = y.hd(), r = f.createImageData(e.width,
                            e.height), x = e.width, z = e.height, T = r.data, M = 0; M < z; ++M) for (var F = z - M - 1, D = 0; D < x; ++D) {
                            var G = 4 * (M * x + D), g = 4 * (F * x + D);
                            T[G] = m[g];
                            T[G + 1] = m[g + 1];
                            T[G + 2] = m[g + 2];
                            T[G + 3] = m[g + 3]
                        }
                        f.putImageData(r, 0, 0);
                        return e.toDataURL("image/png")
                    }, Je: function (m) {
                        !e && m && (e = document.createElement("canvas"), f = e.getContext("2d"));
                        var r = m ? e : document.createElement("canvas");
                        r.width = d.width;
                        r.height = d.height;
                        (m ? f : r.getContext("2d")).drawImage(d, 0, 0);
                        return r
                    }, o: function (m) {
                        m.Uc && !m.Ua ? d = document.getElementById(m.Uc) : m.Ua && (d = m.Ua);
                        d ||
                        (d = document.createElement("canvas"));
                        d.width = m && void 0 !== m.width ? m.width : 512;
                        d.height = m && void 0 !== m.height ? m.height : 512;
                        "undefined" === typeof m && (m = {});
                        void 0 === m.premultipliedAlpha && (m.premultipliedAlpha = !1);
                        void 0 === m.Yb && (m.Yb = !0);
                        void 0 === m.antialias && (m.antialias = !1);
                        if (!b) {
                            var r = {
                                antialias: m.antialias,
                                alpha: !0,
                                preserveDrawingBuffer: !0,
                                premultipliedAlpha: m.premultipliedAlpha,
                                stencil: !1,
                                depth: m.Yb
                            };
                            c() || (b = d.getContext("webgl2", r));
                            b ? l = !0 : ((b = d.getContext("webgl", r)) || (b = d.getContext("experimental-webgl",
                                r)), l = !1)
                        }
                        if (!b) return a("WebGL is not enabled");
                        (k = b.getExtension("WEBGL_lose_context")) && m.kc && (p = m.kc, d.addEventListener("webglcontextlost", p, !1));
                        if (!Z.o()) return a("Not enough capabilities");
                        if (!Z.Jc() && l) return a("Your configuration cannot process color buffer float");
                        b.clearColor(0, 0, 0, 0);
                        b.disable(b.DEPTH_TEST);
                        b.disable(b.BLEND);
                        b.disable(b.DITHER);
                        b.disable(b.STENCIL_TEST);
                        b.disable(b.SCISSOR_TEST);
                        b.GENERATE_MIPMAP_HINT && b.hint(b.GENERATE_MIPMAP_HINT, b.FASTEST);
                        b.disable(b.SAMPLE_ALPHA_TO_COVERAGE);
                        b.disable(b.SAMPLE_COVERAGE);
                        return !0
                    }, pd: function () {
                        if (!t.o()) return !1;
                        b.depthFunc(b.LEQUAL);
                        b.clearDepth(1);
                        return !0
                    }, h: function () {
                        b && Z.h();
                        k && p && (d.removeEventListener("webglcontextlost", p, !1), p = null);
                        n = f = e = d = null
                    }
                };
            return y
        }(), Ia = function () {
            var a = "undefined" === typeof t ? null : t;
            return {
                Od: function (c) {
                    a !== c && (a && a.ka(), a = c)
                }, kb: function () {
                    return a.kb()
                }, xa: function () {
                    a.xa()
                }, ub: function () {
                    a.ub()
                }, ka: function () {
                    a.ka()
                }, set: function (c) {
                    a.set(c)
                }, h: function () {
                    a.h && a.h()
                }
            }
        }(), ka = function () {
            var a = null,
                c = null, d = 0, e = -2, f = -2, k = !1, l = [], n = {
                    reset: function () {
                        f = e = -2
                    }, o: function () {
                        k || (a = b.createBuffer(), b.bindBuffer(b.ARRAY_BUFFER, a), b.bufferData(b.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), b.STATIC_DRAW), c = b.createBuffer(), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c), b.bufferData(b.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), b.STATIC_DRAW), n.oa(), k = !0)
                    }, instance: function (p) {
                        var y = d++, m = p.$ ? p.$.length : 0, r = "undefined" === typeof p.mode ? b.STATIC_DRAW : p.mode,
                            x = b.createBuffer();
                        b.bindBuffer(b.ARRAY_BUFFER,
                            x);
                        b.bufferData(b.ARRAY_BUFFER, p.vc instanceof Float32Array ? p.vc : new Float32Array(p.vc), r);
                        e = y;
                        var z = null, T = null, M = null;
                        if (p.$) {
                            z = b.createBuffer();
                            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, z);
                            var F = null;
                            65536 > p.$.length ? (F = Uint16Array, T = b.UNSIGNED_SHORT, M = 2) : (F = Uint32Array, T = b.UNSIGNED_INT, M = 4);
                            b.bufferData(b.ELEMENT_ARRAY_BUFFER, p.$ instanceof F ? p.$ : new F(p.$), r);
                            f = y
                        }
                        var D = {
                            Ic: function (G) {
                                e !== y && (b.bindBuffer(b.ARRAY_BUFFER, x), e = y);
                                G && Ia.ub()
                            }, Fc: function () {
                                f !== y && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
                                    z), f = y)
                            }, bind: function (G) {
                                D.Ic(G);
                                D.Fc()
                            }, pe: function () {
                                b.drawElements(b.TRIANGLES, m, T, 0)
                            }, qe: function (G, g) {
                                b.drawElements(b.TRIANGLES, G, T, g * M)
                            }, remove: function () {
                                b.deleteBuffer(x);
                                p.$ && b.deleteBuffer(z);
                                D = null
                            }
                        };
                        l.push(D);
                        return D
                    }, oa: function () {
                        -1 !== e && (b.bindBuffer(b.ARRAY_BUFFER, a), e = -1);
                        -1 !== f && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c), f = -1)
                    }, g: function (p, y) {
                        p && ka.oa();
                        y && Ia.xa();
                        b.drawElements(b.TRIANGLES, 3, b.UNSIGNED_SHORT, 0)
                    }, Pb: function () {
                        b.deleteBuffer(a);
                        b.deleteBuffer(c)
                    }, h: function () {
                        n.Pb();
                        l.forEach(function (p) {
                            p.remove()
                        });
                        b.bindBuffer(b.ARRAY_BUFFER, null);
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
                        n.reset();
                        k = !1;
                        l.splice(0);
                        d = 0
                    }
                };
            return n
        }(), aa = function () {
            var a = null, c = null, d = null, e = !1, f = [], k = {w: -2, Nb: 1}, l = {
                o: function () {
                    if (!e) {
                        a = b.createFramebuffer();
                        var n = Z.u();
                        c = n && b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER;
                        d = n && b.READ_FRAMEBUFFER ? b.READ_FRAMEBUFFER : b.FRAMEBUFFER;
                        e = !0
                    }
                }, Ne: function () {
                    return c
                }, cb: function () {
                    return d
                }, ha: function () {
                    return b.FRAMEBUFFER
                }, Ue: function () {
                    return k
                },
                Ge: function () {
                    return a
                }, instance: function (n) {
                    void 0 === n.Xb && (n.Xb = !1);
                    var p = n.aa ? n.aa : null, y = n.width, m = void 0 !== n.height ? n.height : n.width, r = a,
                        x = null, z = !1, T = !1, M = 0;
                    p && (y = y ? y : p.A(), m = m ? m : p.N());
                    var F = {
                        pc: function () {
                            z || (r = b.createFramebuffer(), z = !0, M = k.Nb++)
                        }, yc: function () {
                            F.pc();
                            F.l();
                            x = b.createRenderbuffer();
                            b.bindRenderbuffer(b.RENDERBUFFER, x);
                            b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, y, m);
                            b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, x);
                            b.clearDepth(1)
                        }, bind: function (D,
                                           G) {
                            M !== k.w && (b.bindFramebuffer(c, r), k.w = M);
                            p && p.l();
                            G && b.viewport(0, 0, y, m);
                            D && b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT)
                        }, be: function () {
                            M !== k.w && (b.bindFramebuffer(c, r), k.w = M)
                        }, clear: function () {
                            b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT)
                        }, ie: function () {
                            b.clear(b.COLOR_BUFFER_BIT)
                        }, je: function () {
                            b.clear(b.DEPTH_BUFFER_BIT)
                        }, Qd: function () {
                            b.viewport(0, 0, y, m)
                        }, l: function () {
                            M !== k.w && (b.bindFramebuffer(c, r), k.w = M)
                        }, rtt: function (D) {
                            p = D;
                            k.w !== M && (b.bindFramebuffer(b.FRAMEBUFFER, r), k.w = M);
                            D.l()
                        }, F: function () {
                            b.bindFramebuffer(c,
                                null);
                            k.w = -1
                        }, resize: function (D, G) {
                            y = D;
                            m = G;
                            x && (b.bindRenderbuffer(b.RENDERBUFFER, x), b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, y, m))
                        }, remove: function () {
                            r === a || T || (b.bindFramebuffer(c, r), b.framebufferTexture2D(c, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, null, 0), x && b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, null), b.bindFramebuffer(c, null), b.deleteFramebuffer(r), x && b.deleteRenderbuffer(x));
                            T = !0
                        }
                    };
                    n.Xb && F.yc();
                    f.push(F);
                    return F
                }, F: function () {
                    b.bindFramebuffer(c, null);
                    k.w = -1
                },
                Wd: function () {
                    b.bindFramebuffer(c, null);
                    b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                    b.viewport(0, 0, Z.A(), Z.N());
                    k.w = -1
                }, reset: function () {
                    k.w = -2
                }, U: function () {
                    0 !== k.w && (b.bindFramebuffer(c, a), k.w = 0)
                }, clear: function () {
                    b.viewport(0, 0, Z.A(), Z.N());
                    b.clear(b.COLOR_BUFFER_BIT)
                }, h: function () {
                    l.F();
                    f.forEach(function (n) {
                        n.remove()
                    });
                    b.deleteFramebuffer(a);
                    l.reset();
                    e = !1;
                    f.splice(0);
                    k.w = -2;
                    k.Nb = 1
                }
            };
            return l
        }(), Fa = function () {
            function a(q) {
                b.bindTexture(b.TEXTURE_2D, q)
            }

            function c(q) {
                la[0] = q;
                q = ca[0];
                var C =
                    q >> 16 & 32768, h = q >> 12 & 2047, N = q >> 23 & 255;
                return 103 > N ? C : 142 < N ? C | 31744 | ((255 == N ? 0 : 1) && q & 8388607) : 113 > N ? (h |= 2048, C | (h >> 114 - N) + (h >> 113 - N & 1)) : C = (C | N - 112 << 10 | h >> 1) + (h & 1)
            }

            function d(q) {
                var C = new Uint16Array(q.length);
                q.forEach(function (h, N) {
                    C[N] = c(h)
                });
                return C
            }

            function e() {
                if (null !== oa.fb) return oa.fb;
                var q = k(d([1, 1, 1, 1]));
                return null === q ? !0 : oa.fb = q
            }

            function f() {
                if (null !== oa.gb) return oa.gb;
                var q = k(new Uint8Array([255, 255, 255, 255]));
                return null === q ? !0 : oa.gb = q
            }

            function k(q) {
                if (!Ia.kb() || !M) return null;
                var C =
                    null;
                try {
                    var h = b.getError();
                    C = B.instance({isFloat: !1, H: !0, array: q, width: 1});
                    h = b.getError();
                    if (h !== b.NO_ERROR) return !1
                } catch (N) {
                    return !1
                }
                aa.F();
                b.viewport(0, 0, 1, 1);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT);
                Ia.set("s0");
                C.Bb(0);
                ka.g(!1, !0);
                q = new Uint8Array(4);
                b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, q);
                q = .9 < q[0];
                C.remove();
                aa.U();
                return q
            }

            var l = 0, n = null, p = 0, y = null, m = null, r = null, x = null, z = null, T = null, M = !1, F = [],
                D = {
                    isFloat: !1,
                    isPot: !0,
                    isLinear: !1,
                    isMipmap: !1,
                    isAnisotropicFiltering: !1,
                    isMirrorX: !1,
                    isMirrorY: !1,
                    isSrgb: !1,
                    isKeepArray: !1,
                    isFlipY: null,
                    width: 0,
                    height: 0,
                    url: null,
                    array: null,
                    data: null,
                    D: null,
                    qd: !1,
                    H: !1,
                    Y: null,
                    Ka: 4,
                    lb: 0
                }, G = !1, g = null, w = null, A = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], Y = !1,
                na = !1, la = new Float32Array(1), ca = new Int32Array(la.buffer), oa = {fb: null, gb: null}, B = {
                    o: function () {
                        if (!M) {
                            z = [b.RGB, !1, b.RGB, b.RGBA];
                            T = [b.RGB, !1, b.RGB, b.RGBA];
                            n = [b.TEXTURE0, b.TEXTURE1, b.TEXTURE2, b.TEXTURE3, b.TEXTURE4, b.TEXTURE5, b.TEXTURE6, b.TEXTURE7];
                            Y = "undefined" !== typeof JEContext;
                            na = "undefined" !== typeof Z;
                            Y && JEContext.ff() && n.push(b.TEXTURE8, b.TEXTURE9);
                            y = [-1, -1, -1, -1, -1, -1, -1, -1];
                            x = [b.UNSIGNED_BYTE, b.FLOAT, b.FLOAT];
                            if (!m) {
                                for (var q = new Float32Array(16384), C = 0; 16384 > C; ++C) q[C] = 2 * Math.random() - 1;
                                m = {
                                    random: B.instance({isFloat: !0, isPot: !0, array: q, width: 64}),
                                    uc: B.instance({isFloat: !1, isPot: !0, width: 1, array: new Uint8Array([0, 0, 0, 0])})
                                }
                            }
                            M = !0
                        }
                    }, od: function () {
                        B.Xd()
                    }, Ye: function () {
                        return m.uc
                    }, Xd: function () {
                        x[1] = Z.Fa()
                    }, Kd: function () {
                        T = z = [b.RGBA, b.RGBA, b.RGBA, b.RGBA]
                    }, kf: function (q, C) {
                        t.set("s1");
                        aa.F();
                        var h =
                            q.A(), N = q.N();
                        b.viewport(0, 0, h, N);
                        q.b(0);
                        ka.g(!1, !1);
                        b.readPixels(0, 0, h, N, b.RGBA, b.UNSIGNED_BYTE, C)
                    }, dd: function (q, C, h) {
                        b.activeTexture(b.TEXTURE0);
                        l = 0;
                        var N = b.createTexture();
                        a(N);
                        var qa = Z.u() && b.RGBA32F ? b.RGBA32F : b.FLOAT;
                        C = C instanceof Float32Array ? C : new Float32Array(C);
                        var ua = pa.vd(C.length);
                        ua !== Math.floor(ua) && (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE));
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
                        b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, h);
                        b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, q.A(), q.N(), 0, b.RGBA, qa, C);
                        a(null);
                        b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                        aa.U();
                        t.set("s0");
                        q.J();
                        b.clearColor(0, 0, 0, 0);
                        b.clear(b.COLOR_BUFFER_BIT);
                        a(N);
                        ka.g(!0, !1);
                        b.deleteTexture(N)
                    }, instance: function (q) {
                        function C() {
                            a(ta);
                            va && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, va);
                            h.isPot ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, h.isMirrorX ? b.MIRRORED_REPEAT : b.REPEAT),
                                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, h.isMirrorY ? b.MIRRORED_REPEAT : b.REPEAT)) : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE));
                            h.isAnisotropicFiltering && "undefined" !== typeof JESETTINGS && b.texParameterf(b.TEXTURE_2D, JEContext.Me().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.$d);
                            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, h.isLinear ? b.LINEAR : b.NEAREST);
                            h.isLinear ? b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER,
                                h.isMipmap && !Ja ? b.NEAREST_MIPMAP_LINEAR : b.LINEAR) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, h.isMipmap && !Ja ? b.NEAREST_MIPMAP_NEAREST : b.NEAREST);
                            fa = z[h.Ka - 1];
                            ia = T[h.Ka - 1];
                            ja = x[qa];
                            if (Z.u()) {
                                var v = b.RGBA32F;
                                fa === b.RGBA && ja === b.FLOAT && v && (ia = v);
                                fa === b.RGB && ja === b.FLOAT && v && (ia = v, fa = b.RGBA)
                            }
                            if (h.H && !h.isFloat || h.isFloat && h.isMipmap && Va.ud()) (v = b.RGBA16F) && (ia = v), ja = Z.Fa();
                            h.lb && (fb = h.lb);
                            h.isSrgb && 4 === h.Ka && (fa = JEContext.We());
                            if (h.D) b.texImage2D(b.TEXTURE_2D, 0, ia, fa, ja, h.D); else if (h.url) b.texImage2D(b.TEXTURE_2D,
                                0, ia, fa, ja, Ea); else if (wa) {
                                try {
                                    b.getError(), b.texImage2D(b.TEXTURE_2D, 0, ia, J, K, 0, fa, ja, wa), b.getError() !== b.NO_ERROR && (b.texImage2D(b.TEXTURE_2D, 0, ia, J, K, 0, fa, ja, null), b.getError() !== b.NO_ERROR && b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, J, K, 0, b.RGBA, b.UNSIGNED_BYTE, null))
                                } catch (gc) {
                                    b.texImage2D(b.TEXTURE_2D, 0, ia, J, K, 0, fa, ja, null)
                                }
                                h.isKeepArray || (wa = null)
                            } else b.texImage2D(b.TEXTURE_2D, 0, ia, J, K, 0, fa, ja, null);
                            if (h.isMipmap) if (!Ja && W) W.bb(), gb = !0; else if (Ja) {
                                v = Math.log(Math.min(J, K)) / Math.log(2);
                                Sa = Array(1 +
                                    v);
                                Sa[0] = ta;
                                for (var L = 1; L <= v; ++L) {
                                    var da = Math.pow(2, L), O = J / da;
                                    da = K / da;
                                    var Ka = b.createTexture();
                                    a(Ka);
                                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
                                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
                                    b.texImage2D(b.TEXTURE_2D, 0, ia, O, da, 0, fa, ja, null);
                                    a(null);
                                    Sa[L] = Ka
                                }
                                gb = !0
                            }
                            a(null);
                            y[l] = -1;
                            va && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                            hb = !0;
                            h.Y && W && (h.Y(W), h.Y = null)
                        }

                        var h = Object.assign({}, D, q), N = p++;
                        null === h.isFlipY && (h.isFlipY = h.url || h.array ? !0 : !1);
                        h.data && (h.array = "string" ===
                        typeof h.data ? Nb(h.data) : h.isFloat ? new Float32Array(h.data) : new Uint8Array(h.data), h.isFlipY = !1);
                        var qa = 0, ua = h.D ? !0 : !1, xa = null, Ta = null, Ib = !1, xb = null;
                        h.H = h.H || h.isFloat;
                        h.H && (qa = 1);
                        h.qd || Z.u() || !h.isFloat || !na || Z.Db() || (h.isFloat = !1);
                        h.isFloat && (qa = 2);
                        h.isAnisotropicFiltering && Y && !JEContext.$e() && (h.isAnisotropicFiltering = !1);
                        var ta = b.createTexture(), Ea = null, wa = !1, J = 0, K = 0, hb = !1, ib = !1, ya = null,
                            Ba = null, yb = null, Wa = null, ia = null, fa = null, ja = null, va = h.isFlipY,
                            Ja = h.H && h.isMipmap && "undefined" !== typeof Va && !Va.Lc() ?
                                !0 : !1, Sa = null, fb = -1, gb = !1, La = {$b: !1, Cb: null, Ob: null};
                        h.width && (J = h.width, K = h.height ? h.height : J);
                        var W = {
                            get: function () {
                                return ta
                            }, A: function () {
                                return J
                            }, N: function () {
                                return K
                            }, Ze: function () {
                                return h.url
                            }, af: function () {
                                return h.isFloat
                            }, cf: function () {
                                return h.H
                            }, df: function () {
                                return h.isLinear
                            }, bb: function () {
                                b.generateMipmap(b.TEXTURE_2D)
                            }, Hc: function (v, L) {
                                Ja ? (v || (v = W.Sb()), W.Sa(L), a(Sa[v]), y[L] = -1) : W.b(L)
                            }, Sb: function () {
                                -1 === fb && (fb = Math.log(J) / Math.log(2));
                                return fb
                            }, ed: function (v) {
                                if (Ja) {
                                    v || (v = W.Sb());
                                    t.set("s11");
                                    W.Sa(0);
                                    for (var L = J, da = K, O = 1; O <= v; ++O) L /= 2, da /= 2, t.wa("u7", .25 / L, .25 / da), b.viewport(0, 0, L, da), a(Sa[O - 1]), b.framebufferTexture2D(aa.ha(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, Sa[O], 0), ka.g(!1, 1 === O);
                                    y[0] = -1
                                } else W.bb()
                            }, Sa: function (v) {
                                v !== l && (b.activeTexture(n[v]), l = v)
                            }, b: function (v) {
                                if (!hb) return !1;
                                W.Sa(v);
                                if (y[v] === N) return !1;
                                a(ta);
                                y[v] = N;
                                return !0
                            }, Bb: function (v) {
                                b.activeTexture(n[v]);
                                l = v;
                                a(ta);
                                y[v] = N
                            }, l: function () {
                                r = W;
                                b.framebufferTexture2D(aa.ha(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, ta, 0)
                            },
                            J: function () {
                                r = W;
                                b.viewport(0, 0, J, K);
                                b.framebufferTexture2D(aa.ha(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, ta, 0)
                            }, vb: B.vb, resize: function (v, L) {
                                J = v;
                                K = L;
                                C()
                            }, clone: function (v) {
                                v = B.instance({
                                    width: J,
                                    height: K,
                                    H: h.H,
                                    isFloat: h.isFloat,
                                    isLinear: h.isLinear,
                                    isMirrorY: h.isMirrorY,
                                    isFlipY: v ? !va : va,
                                    isPot: h.isPot
                                });
                                Ia.set("s0");
                                aa.U();
                                v.l();
                                b.viewport(0, 0, J, K);
                                W.b(0);
                                ka.g(!0, !0);
                                return v
                            }, Qd: function () {
                                b.viewport(0, 0, J, K)
                            }, remove: function () {
                                b.deleteTexture(ta);
                                F.splice(F.indexOf(W), 1);
                                W = null
                            }, refresh: function () {
                                W.Bb(0);
                                va && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                                ua ? b.texImage2D(b.TEXTURE_2D, 0, ia, fa, b.UNSIGNED_BYTE, h.D) : b.texImage2D(b.TEXTURE_2D, 0, ia, J, K, 0, fa, ja, wa);
                                va && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1)
                            }, Hb: function () {
                                var v = J * K * 4;
                                Ba = [new Uint8Array(v), new Uint8Array(v), new Uint8Array(v), new Uint8Array(v)];
                                ya = [new Float32Array(Ba[0].buffer), new Float32Array(Ba[1].buffer), new Float32Array(Ba[2].buffer), new Float32Array(Ba[3].buffer)];
                                yb = new Uint8Array(4 * v);
                                Wa = new Float32Array(yb.buffer);
                                ib = !0
                            }, oc: function () {
                                ib ||
                                W.Hb();
                                b.readPixels(0, 0, J, 4 * K, b.RGBA, b.UNSIGNED_BYTE, yb);
                                for (var v = J * K, L = 2 * v, da = 3 * v, O = 0; O < v; ++O) ya[0][O] = Wa[O], ya[1][O] = Wa[O + v], ya[2][O] = Wa[O + L], ya[3][O] = Wa[O + da];
                                return ya
                            }, Gd: function () {
                                La.$b || (La.Cb = new Uint8Array(J * K * 4), La.Ob = new Float32Array(La.buffer), La.$b = !0);
                                b.readPixels(0, 0, J, K, b.RGBA, b.UNSIGNED_BYTE, La.Cb);
                                return La.Ob
                            }, Ib: function (v) {
                                aa.F();
                                t.set("s12");
                                W.b(0);
                                if (v) b.viewport(0, 0, J, K), t.tb("u8", .25, .25, .25, .25), ka.g(!1, !0); else for (v = 0; 4 > v; ++v) b.viewport(0, K * v, J, K), t.tb("u8", A[v]), ka.g(!1,
                                    0 === v)
                            }, Bf: function (v) {
                                var L = ja === x[0] && !f();
                                a(ta);
                                va && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                                L ? (Ib || (xa = document.createElement("canvas"), xa.width = J, xa.height = K, Ta = xa.getContext("2d"), xb = Ta.createImageData(J, K), Ib = !0), xb.data.set(v), Ta.putImageData(xb, 0, 0), b.texImage2D(b.TEXTURE_2D, 0, ia, fa, ja, xa)) : b.texImage2D(b.TEXTURE_2D, 0, ia, J, K, 0, fa, ja, v);
                                y[l] = N;
                                va && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1)
                            }, Cf: function (v, L) {
                                a(ta);
                                L && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                                b.texImage2D(b.TEXTURE_2D, 0, ia, fa, ja,
                                    v);
                                y[l] = N;
                                L && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1)
                            }, rf: function (v, L) {
                                var da = J * K, O = 4 * da;
                                v = h.H ? v ? "RGBE" : "JSON" : "RGBA";
                                L && (v = L);
                                L = Z.u() && !1;
                                var Ka = null;
                                switch (v) {
                                    case "RGBE":
                                        Ka = "s40";
                                        break;
                                    case "JSON":
                                        Ka = L ? "s0" : "s12";
                                        break;
                                    case "RGBA":
                                    case "RGBAARRAY":
                                        Ka = "s6"
                                }
                                ib || ("RGBA" === v || "RGBE" === v || "RGBAARRAY" === v ? (Ba = new Uint8Array(O), ib = !0) : "JSON" !== v || L || W.Hb());
                                aa.F();
                                t.set(Ka);
                                W.b(0);
                                O = null;
                                if ("RGBA" === v || "RGBE" === v || "RGBAARRAY" === v) {
                                    b.viewport(0, 0, J, K);
                                    ka.g(!0, !0);
                                    b.readPixels(0, 0, J, K, b.RGBA, b.UNSIGNED_BYTE,
                                        Ba);
                                    if ("RGBAARRAY" === v) return {data: Ba};
                                    G || (g = document.createElement("canvas"), w = g.getContext("2d"), G = !0);
                                    g.width = J;
                                    g.height = K;
                                    da = w.createImageData(J, K);
                                    da.data.set(Ba);
                                    w.putImageData(da, 0, 0);
                                    O = g.toDataURL("image/png")
                                } else if ("JSON" === v) if (L) O = new Float32Array(da), b.viewport(0, 0, J, K), ka.g(!0, !0), b.readPixels(0, 0, J, K, b.RGBA, b.FLOAT, O); else {
                                    for (O = 0; 4 > O; ++O) b.viewport(0, K * O, J, K), t.tb("u8", A[O]), ka.g(!O, !O);
                                    W.oc();
                                    O = Array(da);
                                    for (L = 0; L < da; ++L) O[4 * L] = ya[0][L], O[4 * L + 1] = ya[1][L], O[4 * L + 2] = ya[2][L], O[4 * L +
                                    3] = ya[3][L]
                                }
                                return {
                                    format: v,
                                    data: O,
                                    width: J,
                                    height: K,
                                    isMirrorY: h.isMirrorY,
                                    isFlipY: "RGBA" === v ? h.isFlipY : !h.isFlipY
                                }
                            }
                        };
                        h.isMipmap && !Ja && hb && !gb && (W.bb(), gb = !0);
                        if (h.url) a(ta), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, null), Ea = new Image, Ea.me = "Anonymous", Ea.crossOrigin = "Anonymous", Ea.src = h.url, Ea.onload = function () {
                            J = Ea.width;
                            K = Ea.height;
                            C()
                        }; else if (h.D) {
                            var Jb = function () {
                                J = void 0 !== h.D.videoWidth ? h.D.videoWidth : h.D.width;
                                K = void 0 !== h.D.videoHeight ? h.D.videoHeight : h.D.height;
                                J ?
                                    C() : setTimeout(Jb, 1)
                            };
                            Jb()
                        } else h.array ? (h.H && !h.isFloat ? h.array instanceof Uint16Array ? (wa = h.array, C()) : e() ? (wa = d(h.array), C()) : (C(), B.dd(W, h.array, va)) : (wa = h.isFloat ? h.array instanceof Float32Array ? h.array : new Float32Array(h.array) : h.array instanceof Uint8Array ? h.array : new Uint8Array(h.array), C()), h.isKeepArray || (wa && wa !== h.array && (wa = null), delete h.array)) : C();
                        W.Ve = W.A;
                        h.Y && hb && (h.Y(W), h.Y = null);
                        F.push(W);
                        return W
                    }, F: function (q) {
                        q !== l && (b.activeTexture(n[q]), l = q);
                        y[q] = -1;
                        a(null)
                    }, de: function (q) {
                        m.random.b(q)
                    },
                    vb: function () {
                        r = null;
                        b.framebufferTexture2D(aa.ha(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, null, 0)
                    }, reset: function () {
                        for (var q = 0; q < n.length; ++q) y[q] = -1;
                        l = -1
                    }, pf: function () {
                        l = -1
                    }, Vd: function () {
                        for (var q = 0; q < n.length; ++q) B.F(q)
                    }, Pb: function () {
                        m && (m.random.remove(), m.uc.remove())
                    }, Af: function (q, C) {
                        if ("RGBA" === q.format || "RGBE" === q.format) {
                            var h = new Image;
                            h.src = q.data;
                            h.onload = function () {
                                B.instance({
                                    isMirrorY: q.isMirrorY, isFlipY: q.isFlipY, isFloat: !1, D: h, Y: function (N) {
                                        if ("RGBA" === q.format) C(N); else {
                                            var qa = q.width,
                                                ua = q.height, xa = B.instance({
                                                    isMirrorY: q.isMirrorY,
                                                    isFloat: !0,
                                                    width: qa,
                                                    height: ua,
                                                    isFlipY: q.isFlipY
                                                });
                                            aa.U();
                                            b.viewport(0, 0, qa, ua);
                                            t.set("s41");
                                            xa.l();
                                            N.b(0);
                                            ka.g(!0, !0);
                                            B.F(0);
                                            C(xa);
                                            b.flush();
                                            setTimeout(N.remove, 50)
                                        }
                                    }
                                })
                            }
                        } else "JSON" === q.format ? C(B.instance({
                            isFloat: !0,
                            isFlipY: q.isFlipY,
                            width: q.width,
                            height: q.height,
                            array: new Float32Array(q.data)
                        })) : C(!1)
                    }, h: function () {
                        r && (ra.U(), B.vb(), ra.F());
                        B.Vd();
                        F.slice(0).forEach(function (q) {
                            q.remove()
                        });
                        F.splice(0);
                        M = !1;
                        p = 0;
                        Va.h()
                    }
                };
            return B
        }(), Rb = function () {
            return {
                instance: function (a) {
                    var c =
                        [Fa.instance(a), Fa.instance(a)], d = [c[1], c[0]], e = d, f = {
                        Nd: function (k) {
                            e[1].l();
                            e[0].b(k);
                            f.rc()
                        }, sf: function (k) {
                            e[1].J();
                            e[0].b(k);
                            f.rc()
                        }, rc: function () {
                            e = e === c ? d : c
                        }, refresh: function () {
                            e[0].refresh();
                            e[1].refresh()
                        }, b: function (k) {
                            e[0].b(k)
                        }, ce: function (k) {
                            e[1].b(k)
                        }, Pe: function () {
                            return e[0]
                        }, remove: function () {
                            e[0].remove();
                            e[1].remove();
                            e = null
                        }
                    };
                    return f
                }
            }
        }(), Z = function () {
            function a() {
                c = "undefined" === typeof Aa ? JEContext : Aa;
                d = !0
            }

            var c = null, d = !1, e = !1, f = null, k = null, l = !1, n = null, p = !1, y = null, m = !1, r = null,
                x = !1, z = !0, T = !0, M = !0, F = null, D = "undefined" === typeof window ? {} : window, G = {
                    o: function () {
                        if (d) return !0;
                        a();
                        G.Lb();
                        G.ab();
                        G.$c();
                        G.ad();
                        aa.o();
                        Fa.o();
                        if (!G.Vc()) return !1;
                        ka.o();
                        Fa.od();
                        return !0
                    }, A: function () {
                        d || a();
                        return c.A()
                    }, N: function () {
                        d || a();
                        return c.N()
                    }, u: function () {
                        d || a();
                        return c.u()
                    }, $c: function () {
                        x = (r = b.getExtension("EXT_color_buffer_float") || b.getExtension("WEBGL_color_buffer_float") || b.getExtension("OES_color_buffer_float")) ? !0 : !1;
                        D.GL_EXT_COLORBUFFERFLOAT = r
                    }, ad: function () {
                        b.getExtension("EXT_color_buffer_half_float") ||
                        b.getExtension("WEBGL_color_buffer_half_float") || b.getExtension("OES_color_buffer_half_float")
                    }, Lb: function () {
                        if (!e) {
                            this.u() || (f = b.getExtension("OES_texture_float") || b.getExtension("MOZ_OES_texture_float") || b.getExtension("WEBKIT_OES_texture_float"), l = (D.GL_EXT_FLOAT = f) ? !0 : !1);
                            if (l || this.u()) k = b.getExtension("OES_texture_float_linear") || b.getExtension("MOZ_OES_texture_float_linear") || b.getExtension("WEBKIT_OES_texture_float_linear"), D.GL_EXT_FLOATLINEAR = k;
                            e = !0
                        }
                    }, ab: function () {
                        if (!m) {
                            if (!this.u()) {
                                if (n =
                                    b.getExtension("OES_texture_half_float") || b.getExtension("MOZ_OES_texture_half_float") || b.getExtension("WEBKIT_OES_texture_half_float")) F = n.HALF_FLOAT_OES, p = !0;
                                !F && b.HALF_FLOAT && (F = b.HALF_FLOAT);
                                !F && b.FLOAT && (F = b.FLOAT);
                                D.GL_EXT_HALFFLOAT = n
                            }
                            if (p || this.u()) y = b.getExtension("OES_texture_half_float_linear") || b.getExtension("MOZ_OES_texture_half_float_linear") || b.getExtension("WEBKIT_OES_texture_half_float_linear"), D.GL_EXT_HALFFLOATLINEAR = y;
                            m = !0
                        }
                    }, Fa: function () {
                        if (G.u()) return b.HALF_FLOAT;
                        G.ab();
                        return p ?
                            F : b.FLOAT
                    }, Db: function () {
                        return z
                    }, Kc: function () {
                        return T
                    }, ee: function () {
                        return M
                    }, Jc: function () {
                        return x
                    }, Xc: function () {
                        T = z = !0;
                        var g = b.createFramebuffer();
                        b.bindFramebuffer(b.FRAMEBUFFER, g);
                        var w = b.createTexture();
                        b.bindTexture(b.TEXTURE_2D, w);
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
                        b.texImage2D(b.TEXTURE_2D, 0, G.u() && b.RGBA32F ? b.RGBA32F : b.RGBA, 1, 1, 0, b.RGBA, b.FLOAT, null);
                        b.framebufferTexture2D(aa.ha(), b.COLOR_ATTACHMENT0,
                            b.TEXTURE_2D, w, 0);
                        var A = b.checkFramebufferStatus(aa.cb());
                        A !== b.FRAMEBUFFER_COMPLETE && (z = !1);
                        b.texImage2D(b.TEXTURE_2D, 0, G.u() && b.RGBA16F ? b.RGBA16F : b.RGBA, 1, 1, 0, b.RGBA, G.Fa(), null);
                        b.framebufferTexture2D(aa.ha(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, w, 0);
                        A = b.checkFramebufferStatus(aa.cb());
                        A !== b.FRAMEBUFFER_COMPLETE && (T = !1);
                        b.bindTexture(b.TEXTURE_2D, null);
                        b.bindFramebuffer(b.FRAMEBUFFER, null);
                        b.deleteTexture(w);
                        b.deleteFramebuffer(g)
                    }, Wc: function () {
                        var g = aa.instance({width: 1});
                        g.pc();
                        var w = Fa.instance({
                            width: 1,
                            isFloat: !0, Ka: 3
                        });
                        g.l();
                        w.l();
                        b.flush();
                        b.checkFramebufferStatus(aa.cb()) !== b.FRAMEBUFFER_COMPLETE ? (Fa.Kd(), M = !1) : M = !0;
                        g.remove();
                        w.remove()
                    }, Vc: function () {
                        G.Xc();
                        if (!z && !T) return !1;
                        G.Wc();
                        return !0
                    }, h: function () {
                        Fa.h();
                        Ia.h();
                        aa.h();
                        ka.h();
                        d = !1
                    }
                };
            return G
        }(), Q = ka, ra = aa, R = Fa, Va = function () {
            function a(z, T, M, F) {
                b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, F ? b.NEAREST_MIPMAP_NEAREST : b.LINEAR);
                var D = null;
                try {
                    if (D = b.getError(), D !== b.NO_ERROR && console.log("GLERR in test_mipmapping():", D), b.texImage2D(b.TEXTURE_2D,
                        0, z, 2, 2, 0, b.RGBA, T, M), D = b.getError(), D !== b.NO_ERROR) return !1
                } catch (G) {
                    return !1
                }
                F && b.generateMipmap(b.TEXTURE_2D);
                Q.oa();
                Q.g(!1, !0);
                b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, l);
                D = b.getError();
                D === b.INVALID_OPERATION && "undefined" !== typeof b.PIXEL_PACK_BUFFER && (b.bindBuffer(b.PIXEL_PACK_BUFFER, null), b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, l), D = b.getError());
                return D !== b.NO_ERROR ? !1 : 0 !== l[0]
            }

            function c(z) {
                return Z.Db() && a(m, b.FLOAT, new Float32Array(p), z) ? (k = f.yb, !0) : !1
            }

            function d(z) {
                return Z.Kc() ?
                    a(r, Z.Fa(), new Uint16Array(p), z) || a(r, b.FLOAT, new Float32Array(p), z) ? (k = f.Ra, !0) : !1 : !1
            }

            var e = !1, f = {yb: 3, Ra: 2, RGBA8: 0}, k = f.RGBA8, l = new Uint8Array(4), n = [.8, 1, .8, 1],
                p = n.concat(n, n, n), y = !0, m = null, r = null, x = {
                    o: function () {
                        Z.Lb();
                        Z.ab();
                        r = m = b.RGBA;
                        if (Aa.u()) {
                            var z = b.RGBA32F;
                            z && (m = z);
                            (z = b.RGBA16F) && (r = z)
                        }
                        Q.o();
                        ra.reset();
                        ra.F();
                        b.viewport(0, 0, 1, 1);
                        t.set("s0");
                        e = !0;
                        z = b.createTexture();
                        b.activeTexture(b.TEXTURE0);
                        b.bindTexture(b.TEXTURE_2D, z);
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.REPEAT);
                        b.texParameteri(b.TEXTURE_2D,
                            b.TEXTURE_WRAP_T, b.REPEAT);
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
                        if (d(!0) || c(!0)) return !0;
                        y = !1;
                        if (d(!1) || c(!1)) return !0;
                        if (Aa.u()) {
                            r = m = b.RGBA;
                            if (d(!0) || c(!0)) return !0;
                            y = !1;
                            if (d(!1) || c(!1)) return !0
                        }
                        return !1
                    }, Lc: function () {
                        return y
                    }, Qe: function () {
                        return k
                    }, bf: function () {
                        e || x.o();
                        return k === f.yb
                    }, ud: function () {
                        e || x.o();
                        return k === f.Ra
                    }, h: function () {
                        e = !1;
                        k = f.RGBA8;
                        y = !0
                    }
                };
            return x
        }(), Xb = function () {
            return {
                instance: function (a) {
                    var c = R.instance(a.alpha), d = R.instance(a.beta);
                    return {
                        Zc: function () {
                            c.b(1);
                            d.b(2)
                        }
                    }
                }
            }
        }(), Lb = function () {
            return {
                instance: function (a) {
                    var c = null, d = !1, e = !1, f = null, k = !1, l = !1, n = null,
                        p = "undefined" === typeof a.preprocessing ? !1 : a.preprocessing,
                        y = "undefined" === typeof a.preprocessingSize ? a.size : a.preprocessingSize;
                    a.mask && (d = !0, I && void 0 !== I.Ec && (a.mask = I.Ec + a.mask), c = R.instance({
                        isFloat: !1,
                        url: a.mask
                    }));
                    var m = !1;
                    a.customInputShader && (m = "s42", t.zb({
                        name: "_",
                        id: m,
                        a: a.customInputShader,
                        c: ["uSource"],
                        precision: "lowp"
                    }), t.K(m, [{type: "1i", name: "_", value: 0}]));
                    switch (p) {
                        case "sobel":
                            n = "s31";
                            k = !0;
                            break;
                        case "meanNormalization":
                            n = "s32";
                            k = !0;
                            break;
                        case "grayScale":
                            n = "s28";
                            k = !1;
                            break;
                        case "grayScaleTilt":
                            n = "s29";
                            l = !0;
                            k = !1;
                            break;
                        case "rgbGrayTilt":
                            n = "s30";
                            l = !0;
                            k = !1;
                            break;
                        case "copy":
                            n = m ? m : "s0";
                            break;
                        case "inputLightRegulation":
                            n = m ? m : "s28";
                            f = Yb.instance({Wb: y, mc: a.size, dc: a.nBlurPass, td: !1});
                            e = !0;
                            break;
                        case "direct":
                        case "none":
                            n = !1;
                            break;
                        default:
                            n = "s3"
                    }
                    l && t.K(n, [{name: "u27", type: "1f", value: a.tilt}]);
                    d && (n += "Mask");
                    var r = R.instance({isFloat: !1, isPot: !1, width: a.size}), x = {
                        A: function () {
                            return y
                        },
                        eb: function () {
                            return x.A()
                        }, kd: function () {
                            return e ? f.Tb() : r
                        }, I: function () {
                            ra.U();
                            n && (t.set(n), k && t.B("u28", 1 / a.size), r.J(), d && c.b(1), Q.g(!1, !1), r.b(0), e && f.Dd(r))
                        }, h: function () {
                            r.remove();
                            d && c.remove()
                        }
                    };
                    return x
                }
            }
        }(), Mb = function () {
            return {
                instance: function (a) {
                    "undefined" === typeof a.disableNormalize && (a.disableNormalize = !1);
                    var c = {input: null, fa: null, ib: null, S: null, Ma: null, pb: null, qb: null}, d = null, e = [],
                        f = [], k = !1, l = null, n = !0, p = -1, y = a.isReorganize ? a.isReorganize : !1,
                        m = a.kernelsNumber ? !0 : !1, r = a.dynPelu ?
                        Xb.instance(a.dynPelu) : !1, x = r ? !0 : !1, z = {isEnabled: !1};
                    a.sd ? (a.sparsity = "undefined" !== typeof a.sparsity ? a.sparsity : a.Na.eb(), n = !1) : "full" === a.connectivityUp && (a.sparsity = a.Na.eb());
                    var T = {
                        elu: "s15",
                        elu01: "s16",
                        relu: "s14",
                        arctan: "s18",
                        sigmoid: "s13",
                        copy: "s0",
                        softplus: "s19",
                        dynPelu: "s17"
                    }[a.activation], M = a.sparsity * a.sparsity, F = !1, D = a.size, G = "";
                    if (a.maxPooling) {
                        switch (a.maxPooling.size) {
                            case 2:
                                G = "s33";
                                break;
                            case 4:
                                G = "s34"
                        }
                        F = !0;
                        D /= a.maxPooling.size;
                        c.pb = R.instance({isFloat: !0, isPot: !1, width: D})
                    }
                    var g =
                        void 0 !== a.Bd && a.Bd ? !0 : !1, w = null, A = null, Y = null;
                    if (g) {
                        w = "s43" + a.index.toString();
                        t.Vb("s43", w, [((a.normalization.n - 1) / 2).toFixed(1)]);
                        t.K(w, [{type: "1i", name: "u1", value: 0}, {
                            type: "2f",
                            name: "u7",
                            value: [1 / a.size, 1 / a.size]
                        }, {type: "1f", name: "u6", value: a.normalization.alpha}, {
                            type: "1f",
                            name: "u9",
                            value: a.normalization.beta
                        }, {type: "1f", name: "u32", value: a.normalization.k}]);
                        var na = {isFloat: !0, isPot: !0, width: a.size};
                        A = R.instance(na);
                        Y = R.instance(na)
                    }
                    var la = -1, ca = null;
                    n && (c.S = R.instance({isFloat: !0, isPot: !1, width: a.size}));
                    c.fa = R.instance(a.bias);
                    var oa = {
                        A: function () {
                            return a.size
                        }, eb: function () {
                            return D
                        }, Qb: function () {
                            return a.classesCount
                        }, Gc: function (B) {
                            d.b(B)
                        }, Ed: function () {
                            a.remap && a.remap.isEnabled && (z = {
                                isEnabled: !0,
                                xd: R.instance({
                                    isFloat: !1,
                                    isFlipY: !1,
                                    array: new Uint8Array(a.remap.maskTexture.data),
                                    width: a.remap.maskTexture.width,
                                    isPot: !1
                                }),
                                layers: a.remap.layers.map(function (B) {
                                    return a.parent.jd(B)
                                }),
                                depth: a.remap.depth
                            })
                        }, Md: function () {
                            switch (a.connectivityUp) {
                                case "direct":
                                    ca = Zb.instance(a.connectivity);
                                    break;
                                case "square":
                                    ca = $b.instance(a.connectivity);
                                    break;
                                case "squareFast":
                                    ca = ac.instance(a.connectivity, a.activation);
                                    break;
                                case "full":
                                    ca = bc.instance(a.connectivity);
                                    break;
                                case "conv":
                                    p = a.kernelsNumber, ca = cc.instance(a.connectivity), y && (c.Ma = R.instance({
                                        width: D,
                                        isFloat: !0,
                                        isFlipY: !1,
                                        isPot: !1
                                    }))
                            }
                            if (ca.ja) {
                                var B = a.size * a.sparsity;
                                la = Math.log(B / a.size) / Math.log(2);
                                c.input = R.instance({isMipmap: !0, isFloat: !0, isPot: !0, width: B, lb: la});
                                c.ib = R.instance({isFloat: !0, isPot: !0, width: a.size})
                            }
                        }, I: function (B) {
                            d = B;
                            ca.ja ?
                                (c.input.J(), m && c.fa.b(2), ca.I(z), c.input.b(0), c.input.ed(la), c.ib.J(), m ? t.set("s0") : (t.set("s27"), t.B("u26", M), c.fa.b(1)), c.input.Hc(la, 0), Q.g(!1, !1), t.set(T), g ? A.l() : c.S.l(), c.ib.b(0), x && r.Zc(), Q.g(!1, !1)) : (c.S.J(), c.fa.b(1), ca.I());
                            g && (t.set(w), Y.l(), A.b(0), Q.g(!1, !1), t.set("s44"), t.B("u6", 1), c.S.l(), Y.b(1), Q.g(!1, !1));
                            if (n) return F ? (c.pb.J(), c.S.b(0), t.set(G), t.wa("u7", 1 / a.size, 1 / a.size), Q.g(!1, !1), B = c.pb) : B = c.S, B.b(0), y && (c.Ma.l(), t.set("s21"), t.wa("u13", p, D / p), Q.g(!1, !1), B = c.Ma, c.Ma.b(0)), B;
                            B = c.S;
                            a.disableNormalize || (t.set("gpuRawAvg" === k ? "s8" : "s7"), t.B("u4", 1 / a.size), c.qb.J(), c.S.b(0), Q.g(!1, !1), B = c.qb);
                            switch (k) {
                                case "cpuRGBA2Float":
                                    B.Ib(!1);
                                    B = oa.Fd(B);
                                    l(B);
                                    break;
                                case "cpuMeanFloat":
                                    B.Ib(!0);
                                    B = B.Gd();
                                    l(B);
                                    break;
                                case "gpuRawAvg":
                                case "gpuRaw":
                                    B.b(0);
                                case "none":
                                    l(B)
                            }
                            return !1
                        }, Tc: function (B) {
                            B && "undefined" !== typeof B.lc && (k = B.lc, l = B.Cd);
                            c.S = R.instance({isFloat: !0, isPot: !0, isMipmap: !1, width: a.size});
                            B = "undefined" !== typeof a.classesCount && a.classesCount ? a.classesCount : a.size * a.size;
                            for (var q =
                                0, C = 0, h = 0; q < B; ++q) e.push(C + (a.size - 1 - h) * a.size), f.push([-1, -1, -1, -1]), ++C, C === a.size && (C = 0, ++h);
                            a.disableNormalize || (c.qb = R.instance({isFloat: !0, isPot: !0, width: a.size}))
                        }, Fd: function (B) {
                            var q = B.oc();
                            e.forEach(function (C, h) {
                                f[h][0] = q[0][C];
                                f[h][1] = q[1][C];
                                f[h][2] = q[2][C];
                                f[h][3] = q[3][C]
                            });
                            return f
                        }, h: function () {
                            for (var B in c) {
                                var q = c[B];
                                q && q.remove()
                            }
                            ca && (ca.h(), ca = null)
                        }
                    };
                    a.Na && oa.Md(a.Na);
                    return oa
                }
            }
        }();
        zb.Jb = function (a) {
            a.forEach(function (c) {
                c.Rc && R.Jb(c.Rc.Df);
                c.fa && R.Jb(c.fa)
            })
        };
        var Zb = function () {
                return {
                    instance: function (a) {
                        var c =
                            R.instance(a.weights);
                        delete a.weights.data;
                        return {
                            ja: !0, Ea: function () {
                                return 1
                            }, h: function () {
                                c.remove()
                            }, nd: function () {
                                return c
                            }, I: function () {
                                t.set("s26");
                                c.b(1);
                                Q.g(!1, !1)
                            }
                        }
                    }
                }
            }(), bc = function () {
                return {
                    instance: function (a) {
                        var c = a.fromLayerSize, d = R.instance(a.weights);
                        delete a.weights.data;
                        return {
                            ja: !0, Ea: function () {
                                return c
                            }, h: function () {
                                d.remove()
                            }, I: function (e) {
                                if (e.isEnabled) {
                                    t.set("s24");
                                    e.xd.b(3);
                                    var f, k = Math.min(e.layers.length, e.depth);
                                    for (f = 0; f < k; ++f) e.layers[f].Gc(4 + f)
                                } else t.set("s23");
                                t.B("u17", a.toLayerSize);
                                d.b(1);
                                Q.g(!1, !1)
                            }
                        }
                    }
                }
            }(), $b = function () {
                return {
                    instance: function (a) {
                        for (var c = a.fromLayerSize, d = a.toLayerSize, e = a.toSparsity, f = e * d, k = f / c, l = c / d, n = 0, p = 0, y = 0, m = Array(e * d * e * d * 4), r = Array(e * d * e * d * 4), x = Array(c * c), z = 0; z < x.length; ++z) x[z] = 0;
                        z = Math.floor(e / 2);
                        for (var T = .5 / d, M = .5 / c, F = .5 / f, D = 0; D < d; ++D) for (var G = Math.round(D * l), g = 0; g < d; ++g) {
                            var w = Math.round(g * l), A = D / d, Y = g / d;
                            A += T;
                            Y += T;
                            for (var na = 0; na < e; ++na) {
                                var la = G + na - z;
                                0 > la && (la += c);
                                la >= c && (la -= c);
                                for (var ca = 0; ca < e; ++ca) {
                                    var oa = n / f, B =
                                        p / f, q = w + ca - z;
                                    0 > q && (q += c);
                                    q >= c && (q -= c);
                                    var C = la / c, h = q / c;
                                    B = 1 - B - 1 / f;
                                    C += M;
                                    h += M;
                                    oa += F;
                                    B += F;
                                    var N = D * e + na, qa = g * e + ca;
                                    qa = d * e - qa - 1;
                                    N = qa * d * e + N;
                                    m[4 * N] = oa;
                                    m[4 * N + 1] = B;
                                    m[4 * N + 2] = C;
                                    m[4 * N + 3] = h;
                                    h = x[q * c + la]++;
                                    N = h % k;
                                    C = la * k + N;
                                    q = q * k + (h - N) / k;
                                    q = c * k - 1 - q;
                                    q = q * c * k + C;
                                    r[4 * q] = oa;
                                    r[4 * q + 1] = B;
                                    r[4 * q + 2] = A;
                                    r[4 * q + 3] = Y;
                                    ++n >= f && (n = 0, ++p);
                                    ++y
                                }
                            }
                        }
                        x = null;
                        var ua = R.instance(a.weights);
                        delete a.weights.data;
                        var xa = R.instance({width: f, isFloat: !0, array: new Float32Array(r), isPot: !0});
                        r = null;
                        var Ta = R.instance({
                            width: f, isFloat: !0, array: new Float32Array(m),
                            isPot: !0
                        });
                        m = null;
                        return {
                            ja: !0, Ea: function () {
                                return k
                            }, h: function () {
                                xa.remove();
                                Ta.remove();
                                ua.remove()
                            }, I: function () {
                                t.set("s22");
                                ua.b(1);
                                Ta.b(2);
                                Q.g(!1, !1)
                            }
                        }
                    }
                }
            }(), cc = function () {
                return {
                    instance: function (a) {
                        var c = a.kernelsNumber, d = a.toSparsity, e = d * a.toLayerSize / a.fromLayerSize,
                            f = R.instance(a.weights);
                        delete a.weights.data;
                        return {
                            ja: !0, Ea: function () {
                                return e
                            }, Xe: function () {
                                return d
                            }, nd: function () {
                                return f
                            }, h: function () {
                                f.remove()
                            }, I: function () {
                                t.set("s25");
                                t.B("u23", c);
                                t.B("u24", d);
                                t.B("u17", a.toLayerSize);
                                t.B("u25", a.fromLayerSize);
                                f.b(1);
                                Q.g(!1, !1)
                            }
                        }
                    }
                }
            }(), ac = function () {
                return {
                    instance: function (a, c) {
                        var d = a.fromLayerSize, e = a.toLayerSize, f = a.toSparsity, k = a.stride ? a.stride : 1,
                            l = f * e / d, n = e < d, p = d / e, y = R.instance(a.weights);
                        delete a.weights.data;
                        var m = "s45" + [d.toString(), e.toString(), f.toString(), k.toString(), c].join("_");
                        t.bd(m) || (a = Wb.fd(c, "gl_FragColor", "gl_FragColor"), e = [{
                            type: "1f",
                            name: "u17",
                            value: e
                        }, {type: "1f", name: "u31", value: k}], n && e.push({
                            type: "1f",
                            name: "u25",
                            value: d
                        }), d = [(n ? l : f).toFixed(1), a], n &&
                        d.push(p.toFixed(1)), t.Vb(n ? "s39" : "s38", m, d), t.K(m, e.concat([{
                            type: "1i",
                            name: "u15",
                            value: 0
                        }, {type: "1i", name: "u22", value: 1}, {type: "1i", name: "u14", value: 3}])));
                        return {
                            ja: !1, Ea: function () {
                                return l
                            }, h: function () {
                                y.remove()
                            }, I: function () {
                                t.set(m);
                                y.b(3);
                                Q.g(!1, !1)
                            }
                        }
                    }
                }
            }(), Yb = function () {
                return {
                    instance: function (a) {
                        var c = a.dc ? a.dc : 3, d = a.Wb ? a.Wb : 64, e = a.mc ? a.mc : 64, f = a.td ? !0 : !1;
                        a = {isFloat: !1, width: d, isPot: !1, isFlipY: !1};
                        var k = R.instance(a), l = R.instance(a), n = R.instance(a), p = R.instance(a), y = R.instance({
                            isFloat: !0,
                            width: e, isPot: !1, isFlipY: !1
                        }), m = 1 / d;
                        return {
                            Dd: function (r) {
                                t.set("s35");
                                p.l();
                                Q.g(f, !1);
                                t.set("s36");
                                for (var x = 0; x < c; ++x) k.l(), t.wa("u7", m, 0), Q.g(f, !1), n.l(), p.b(0), Q.g(f, !1), l.l(), k.b(0), t.wa("u7", 0, m), Q.g(f, !1), p.l(), n.b(0), Q.g(f, !1), x !== c - 1 && l.b(0);
                                t.set("s37");
                                y.l();
                                r.b(0);
                                l.b(1);
                                p.b(2);
                                Q.g(f, !1);
                                y.b(0)
                            }, Tb: function () {
                                return y
                            }
                        }
                    }
                }
            }(), S = {
                md: function () {
                    return S.Gb() ? document.createElement("video") : !1
                }, sa: function (a, c) {
                    a[c] = !0;
                    a.setAttribute(c, "true")
                }, Oc: function () {
                    var a = !1, c = navigator.userAgent ||
                        navigator.vendor || window.opera;
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(c) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,
                        4))) a = !0;
                    return a
                }, Eb: function () {
                    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
                }, gd: function () {
                    var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                    return 2 < a.length ? [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)] : [0, 0, 0]
                }, ac: function () {
                    try {
                        return window.matchMedia("(orientation: portrait)").matches ? !0 : !1
                    } catch (a) {
                        return window.innerHeight > window.innerWidth
                    }
                }, Nc: function () {
                    return S.Fb() || S.Eb()
                }, Fb: function () {
                    var a = navigator.userAgent.toLowerCase();
                    return -1 !==
                    a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1
                }, Ee: function () {
                    return S.Oc() ? S.ac() ? window.innerHeight / window.innerWidth * 45 : 45 : 45
                }, Gb: function () {
                    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1
                }, pause: function (a) {
                    a.pause()
                }, qf: function (a) {
                    a.play()
                }, release: function (a) {
                    a.pause();
                    a.videoStream && a.videoStream.stop();
                    a.videoStream = null
                }, Qc: function (a) {
                    if (!a) return a;
                    var c = !1;
                    if (a.video) {
                        var d = function (e) {
                            var f = {};
                            "undefined" !== typeof e.min && (f.min = e.min);
                            "undefined" !== typeof e.max &&
                            (f.max = e.max);
                            "undefined" !== typeof e.ideal && (f.ideal = e.ideal);
                            return f
                        };
                        c = {};
                        "undefined" !== typeof a.video.width && (c.width = d(a.video.width));
                        "undefined" !== typeof a.video.height && (c.height = d(a.video.height));
                        "undefined" !== typeof a.video.facingMode && (c.facingMode = a.video.facingMode)
                    }
                    c = {audio: a.audio, video: c};
                    "undefined" !== typeof a.deviceId && (c.deviceId = a.deviceId);
                    return c
                }, sc: function (a) {
                    var c = a.video.width;
                    a.video.width = a.video.height;
                    a.video.height = c;
                    return a
                }, Sc: function (a) {
                    function c(r) {
                        return [480,
                            576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function (x, z) {
                            return Math.abs(x - r) - Math.abs(z - r)
                        })
                    }

                    function d(r) {
                        var x = S.Qc(a);
                        e.push(r(x))
                    }

                    var e = [];
                    if (!a || !a.video) return e;
                    if (a.video.width && a.video.height) {
                        if (a.video.width.ideal && a.video.height.ideal) {
                            var f = c(a.video.width.ideal).slice(0, 3), k = c(a.video.height.ideal).slice(0, 3), l = {},
                                n = 0;
                            for (l.X = void 0; n < f.length; l = {X: l.X}, ++n) {
                                l.X = f[n];
                                var p = {}, y = 0;
                                for (p.W = void 0; y < k.length; p = {W: p.W}, ++y) if (p.W = k[y], l.X !== a.video.width.ideal || p.W !== a.video.height.ideal) {
                                    var m =
                                        Math.max(l.X, p.W) / Math.min(l.X, p.W);
                                    m < 4 / 3 - .1 || m > 16 / 9 + .1 || d(function (r, x) {
                                        return function (z) {
                                            z.video.width.ideal = r.X;
                                            z.video.height.ideal = x.W;
                                            return z
                                        }
                                    }(l, p))
                                }
                            }
                        }
                        d(function (r) {
                            return S.sc(r)
                        })
                    }
                    a.video.width && a.video.height && (a.video.width.ideal && a.video.height.ideal && d(function (r) {
                        delete r.video.width.ideal;
                        delete r.video.height.ideal;
                        return r
                    }), d(function (r) {
                        delete r.video.width;
                        delete r.video.height;
                        return r
                    }));
                    a.video.facingMode && (d(function (r) {
                        delete r.video.facingMode;
                        return r
                    }), a.video.width &&
                    a.video.height && d(function (r) {
                        S.sc(r);
                        delete r.video.facingMode;
                        return r
                    }));
                    e.push({audio: a.audio, video: !0});
                    return e
                }, Td: function (a) {
                    if (S.ac()) {
                        if (!a || !a.video) return !1;
                        var c = a.video.width, d = a.video.height;
                        if (!c || !d) return !1;
                        if (c.ideal && d.ideal && c.ideal > d.ideal) return a.video.height = c, a.video.width = d, !0
                    }
                    return !1
                }, Ja: function (a) {
                    a.volume = 0;
                    S.sa(a, "muted");
                    if (S.Fb()) {
                        if (1 === a.volume) {
                            var c = function () {
                                a.volume = 0;
                                window.removeEventListener("mousemove", c, !1);
                                window.removeEventListener("touchstart", c,
                                    !1)
                            };
                            window.addEventListener("mousemove", c, !1);
                            window.addEventListener("touchstart", c, !1)
                        }
                        setTimeout(function () {
                            a.volume = 0;
                            S.sa(a, "muted")
                        }, 5)
                    }
                }, tc: function (a, c, d) {
                    return new Promise(function (e, f) {
                        if (a.srcObject && a.srcObject.getVideoTracks) {
                            var k = a.srcObject.getVideoTracks();
                            1 !== k.length ? f("INVALID_TRACKNUMBER") : (k = k[0], c ? S.get(a, e, f, d) : (k.stop(), e()))
                        } else f("BAD_IMPLEMENTATION")
                    })
                }, Ub: function (a, c, d, e) {
                    function f(l) {
                        k || (k = !0, d(l))
                    }

                    var k = !1;
                    return navigator.mediaDevices.getUserMedia(e).then(function (l) {
                        function n() {
                            setTimeout(function () {
                                if (a.currentTime) {
                                    var p =
                                        a.videoWidth, y = a.videoHeight;
                                    if (0 === p || 0 === y) f("VIDEO_NULLSIZE"); else {
                                        p && (a.style.width = p.toString() + "px");
                                        y && (a.style.height = y.toString() + "px");
                                        p = {Mc: null, Rd: null, yd: null};
                                        try {
                                            var m = l.getVideoTracks()[0];
                                            m && (p.yd = m, p.Mc = m.getCapabilities(), p.Rd = m.getSettings())
                                        } catch (r) {
                                        }
                                        S.Nc() ? a.parentNode && null !== a.parentNode ? (k || c(a, l, p), setTimeout(function () {
                                            a.play()
                                        }, 100)) : (document.body.appendChild(a), S.Ja(a), k || c(a, l, p), setTimeout(function () {
                                            a.style.transform = "scale(0.0001,0.0001)";
                                            a.style.position = "fixed";
                                            a.style.bottom = "0px";
                                            a.style.right = "0px";
                                            S.Ja(a);
                                            setTimeout(function () {
                                                a.play()
                                            }, 100)
                                        }, 80)) : k || c(a, l, p)
                                    }
                                } else f("VIDEO_NOTSTARTED")
                            }, 700)
                        }

                        "undefined" !== typeof a.srcObject ? a.srcObject = l : (a.src = window.URL.createObjectURL(l), a.videoStream = l);
                        S.Ja(a);
                        a.addEventListener("loadeddata", function () {
                            var p = a.play();
                            S.Ja(a);
                            "undefined" === typeof p ? n() : p.then(function () {
                                n()
                            }).catch(function () {
                                f("VIDEO_PLAYPROMISEREJECTED")
                            })
                        }, !1)
                    }).catch(function (l) {
                        f(l)
                    })
                }, get: function (a, c, d, e) {
                    if (!a) return d && d("VIDEO_NOTPROVIDED"),
                        !1;
                    if (!S.Gb()) return d && d("MEDIASTREAMAPI_NOTFOUND"), !1;
                    if (e && e.video) {
                        if (S.Eb()) {
                            var f = S.gd();
                            (12 > f[0] || 12 === f[0] && 2 > f[1]) && S.Td(e)
                        }
                        e.video.width && e.video.width.ideal && (a.style.width = e.video.width.ideal + "px");
                        e.video.height && e.video.height.ideal && (a.style.height = e.video.height.ideal + "px")
                    }
                    S.sa(a, "autoplay");
                    S.sa(a, "playsinline");
                    e && e.audio ? a.volume = 0 : S.sa(a, "muted");
                    S.Ub(a, c, function () {
                        function k(n) {
                            if (0 === n.length) d("INVALID_FALLBACKCONSTRAINTS"); else {
                                var p = n.shift();
                                S.Ub(a, c, function () {
                                    k(n)
                                }, p)
                            }
                        }

                        var l = S.Sc(e);
                        k(l)
                    }, e)
                }, ld: function (a) {
                    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return a(!1, "NOTSUPPORTED"), !1;
                    navigator.mediaDevices.enumerateDevices().then(function (c) {
                        (c = c.filter(function (d) {
                            return d.kind && -1 !== d.kind.toLowerCase().indexOf("video") && d.label && d.deviceId
                        })) && c.length && 0 < c.length ? a(c, !1) : a(!1, "NODEVICESFOUND")
                    }).catch(function () {
                        a(!1, "PROMISEREJECTED")
                    })
                }, fe: function (a, c, d) {
                    var e = {};
                    e[c] = d;
                    c = [];
                    c.push(e);
                    a.applyConstraints({advanced: c}).catch(function () {
                    })
                }
            },
            I = {
                save: "NNC.json",
                Ab: 0,
                Dc: 25,
                Ta: .2,
                ea: [45, 55],
                ae: 1 / 3.5,
                za: [2, 7],
                Hd: {
                    minScale: .15,
                    maxScale: .6,
                    borderWidth: .2,
                    borderHeight: .2,
                    nStepsX: 6,
                    nStepsY: 5,
                    nStepsScale: 3,
                    nDetectsPerLoop: -1
                },
                Ud: 50,
                cc: .5,
                mb: .4,
                zd: 8,
                xc: .8,
                wc: 1,
                Sd: {
                    translationFactorRange: [.0015, .005],
                    rotationFactorRange: [.003, .02],
                    qualityFactorRange: [.9, .98],
                    alphaRange: [.05, 1]
                },
                ya: [.65, 1, .262],
                ca: [.092, .092, .3],
                Ac: .2,
                Cc: 2,
                Bc: .1,
                Ad: 8,
                ic: 1,
                cd: db.Ia.bind(null, .3, .7),
                Yd: 20
            }, ha = {
                facingMode: "user", idealWidth: 800,
                idealHeight: 600, minWidth: 480, maxWidth: 1280, minHeight: 480, maxHeight: 1280, rotate: 0, flipX: !1
            }, ba = {nb: -3, wd: -1, error: -2, play: 1, pause: 2}, ea = ba.nb, u = null, dc = {
                jb: !1,
                element: null,
                aa: null,
                ba: null,
                v: [0, 0],
                C: [.5, .5],
                m: [.5, 0, 0, .5],
                Oa: 0,
                qa: null
            }, H = null, ec = {pa: null, Ca: null, xb: "./", la: null, V: null, Aa: I.Ab, nc: I.Ab, Ha: !1, ga: !1},
            za = null, X = null, sa = null;
        var vb = Oa = Ya = Xa = Na = Ma = Za = Pa = mb = lb = kb = jb = bb = ab = $a = 0;
        var V = null, fc = {M: 0, O: 0, v: [0, 0], Ga: null},
            U = {Qa: null, buffer: null, ca: null, ya: null, R: I.ic, ta: null}, Ua = null, ma = null, cb = null,
            Qa = null, E = {i: 1, Z: 0, L: null, Zb: !1, bc: 0, ob: 0},
            P = {ra: 0, timestamp: 0, fc: 0, hc: 0, G: I.za[0], ec: I.za[0], jc: 0, ia: 0, ke: 1}, rb = [], sb = [],
            Kb = {
                VERSION: "1.2.7", init: function (a) {
                    function c() {
                        ea !== ba.error && 2 === ++e && (Ha(), Gb(), Ga(), H.pa && (H.pa(!1, {
                            GL: b,
                            canvasElement: H.V,
                            videoTexture: u.ba.get(),
                            maxFacesDetected: E.i,
                            videoElement: u.element
                        }), Cb()), pb())
                    }

                    if (ea !== ba.nb) return a.callbackReady && a.callbackReady("ALREADY_INITIALIZED"), !1;
                    ea = ba.wd;
                    u = Object.assign({}, dc);
                    H = Object.assign({}, ec);
                    V = Object.assign({}, fc);
                    E.L = [0];
                    U.ca =
                        I.ca.slice(0);
                    U.ya = I.ya.slice(0);
                    a.callbackReady && (H.pa = a.callbackReady);
                    a.callbackTrack && (H.Ca = a.callbackTrack);
                    a.nExpressions && (U.R = a.nExpressions);
                    a.expressionsEasings && (U.ta = a.expressionsEasings);
                    "undefined" !== typeof a.animateDelay && (H.Aa = a.animateDelay);
                    "undefined" !== typeof a.NNCpath && (H.xb = a.NNCpath);
                    "undefined" !== typeof a.NNC && (H.la = a.NNC);
                    "undefined" !== typeof a.maxFacesDetected && (E.i = Math.max(1, a.maxFacesDetected));
                    "undefined" !== typeof a.followZRot && (H.ga = a.followZRot ? !0 : !1);
                    if (E.i > I.zd) return Da("MAXFACES_TOOHIGH"),
                        !1;
                    if (!a.canvasId && !a.canvas) return Da("NO_CANVASID"), !1;
                    H.V = a.canvas ? a.canvas : document.getElementById(a.canvasId);
                    if (!H.V) return Da("INVALID_CANVASID"), !1;
                    V.M = H.V.width;
                    V.O = H.V.height;
                    if (!V.M || !V.O) return Da("INVALID_CANVASDIMENSIONS"), !1;
                    for (var d = 0; d < E.i; ++d) rb.push(new Float32Array(I.Ad)), sb.push(0);
                    X = Object.create(I.Hd);
                    a.scanSettings && Ra(X, a.scanSettings);
                    sa = Object.create(I.Sd);
                    a.stabilizationSettings && Ra(sa, a.stabilizationSettings);
                    var e = 0;
                    a.videoSettings && a.videoSettings.videoElement ? eb(a.videoSettings.videoElement,
                        c) : (a.videoSettings && Ra(ha, a.videoSettings), Hb(a.onWebcamAsk, a.onWebcamGet, function (f) {
                        eb(f, c)
                    }));
                    Sb(function (f) {
                        if (!Tb()) return !1;
                        za = new zb({});
                        za.Jd(f.layers);
                        za.Ld({lc: "gpuRawAvg", Cd: Vb});
                        t.zc([{
                            id: "s48",
                            name: "_",
                            da: "attribute vec2 a0;uniform mat2 u33;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u33*a0;}",
                            Ba: ["a0"],
                            ma: [2],
                            a: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                            c: ["u1", "u33"],
                            precision: "lowp"
                        }, {
                            id: "s49",
                            name: "_",
                            a: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                            da: "attribute vec2 a0;uniform sampler2D u34;uniform vec2 u35;uniform float u36,u37;varying vec2 vv0;void main(){vec4 a=texture2D(u34,vec2(.17,u36));vec2 d=a.gb,e=a.a*u35;float b=cos(u37),c=sin(u37);vec2 g=mat2(b,c,-c,b)*a0;vv0=d+g*.5*e,gl_Position=vec4(a0,0.,1.);}",
                            Ba: ["a0"],
                            ma: [2],
                            c: ["u1", "u34", "u35", "u36", "u37"],
                            precision: "lowp"
                        }, {
                            id: "s50",
                            name: "_",
                            a: "uniform sampler2D u38,u34;uniform vec3 u39,u40;uniform float u41,u42,u43,u36,u44,u37,u45;const vec4 e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u38,vec2(.625,.625)),h=texture2D(u38,vec2(.875,.625)),a=texture2D(u34,vec2(.17,u36));float b=dot(g,e),i=dot(h,e);bool j=b>u42&&b>i+u43;j?a.r=2.:a.r>u41?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r*=u44;if(a.r<.9)a=vec4(1.,u39);else{a.r*=step(1.9,a.r);float k=dot(e,texture2D(u38,vec2(.875,.875))),l=dot(e,texture2D(u38,vec2(.125,.625))),m=dot(e,texture2D(u38,vec2(.375,.625))),c=cos(u37),d=sin(u37);vec2 f=mat2(c,d*u45,-d/u45,c)*vec2(k,l);a.gba+=vec3(f,m)*u40*a.a;}gl_FragColor=a;}",
                            da: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                            c: "u38 u34 u39 u41 u40 u44 u37 u45 u42 u43 u36".split(" ")
                        }, {
                            id: "s51",
                            name: "_",
                            da: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                            a: "uniform sampler2D u38;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u38,vec2(.125,.875))),b=dot(e,texture2D(u38,vec2(.375,.875))),c=dot(e,texture2D(u38,vec2(.625,.875))),d=dot(e,texture2D(u38,vec2(.625,.625)));vec3 f=vec3(a,b,c)*.5+g;gl_FragColor=vec4(f,d);}",
                            c: ["u38"]
                        }, {
                            id: "s52",
                            name: "_",
                            da: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                            a: "uniform sampler2D u38;const vec4 e=vec4(.25,.25,.25,.25);void main(){float a=dot(e,texture2D(u38,vec2(.375,.375))),b=dot(e,texture2D(u38,vec2(.625,.375))),c=dot(e,texture2D(u38,vec2(.875,.375))),d=dot(e,texture2D(u38,vec2(.125,.125)));gl_FragColor=vec4(a,b,c,d);}",
                            c: ["u38"]
                        }, {
                            id: "s47",
                            name: "_",
                            a: "uniform sampler2D u34;uniform vec2 u46;uniform float u47;varying vec2 vv0;void main(){float g=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u34,vv0+u46);a.a=mix(a.a*u47,a.a,c);vec4 d=floor(255.*a),f=255.*(255.*a-d),b=mix(d,f,g)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
                            c: ["u34", "u47", "u46"]
                        }]);
                        Qb();
                        ub();
                        tb();
                        c()
                    });
                    return !0
                }, destroy: function () {
                    return new Promise(function (a) {
                        Kb.toggle_pause(!0, !0).finally(function () {
                            za && za.h();
                            Aa.h();
                            za = ma = Ua = null;
                            rb.splice(0);
                            sb.splice(0);
                            ea = ba.nb;
                            a()
                        })
                    })
                }, toggle_pause: function (a, c) {
                    if (!ob()) return Promise.reject();
                    c = c ? S.tc(u.element, !a, u.qa) : Promise.resolve();
                    a ? Bb() : pb();
                    return c
                }, update_videoSettings: function (a) {
                    Bb();
                    return new Promise(function (c) {
                        S.tc(u.element, !1, u.qa).then(function () {
                            Ra(ha, a);
                            Hb(null, null, function (d) {
                                eb(d, function () {
                                    Ha();
                                    Ga();
                                    pb();
                                    c()
                                })
                            })
                        })
                    })
                }, toggle_slow: function (a) {
                    ob() && ea === ba.play && (a && !H.Ha ? (H.nc = H.Aa, X.nDetectsPerLoop = 1, this.set_animateDelay(100), H.Ha = !0) : !a && H.Ha && (X.nDetectsPerLoop = -1, this.set_animateDelay(H.nc), H.Ha = !1))
                }, set_animateDelay: function (a) {
                    H.Aa = a
                }, resize: function () {
                    var a = H.V.width, c = H.V.height;
                    if (!wb() && a === V.M && c === V.O) return !1;
                    V.M = a;
                    V.O = c;
                    ub();
                    tb();
                    Ha();
                    Ga();
                    u.ba && u.ba.resize(V.M, V.O);
                    return !0
                }, set_inputTexture: function (a, c, d) {
                    u.v[0] = c;
                    u.v[1] = d;
                    u.jb = !0;
                    Ha();
                    Cb();
                    Ga();
                    t.set("s48");
                    u.ba.J();
                    b.activeTexture(b.TEXTURE0);
                    b.bindTexture(b.TEXTURE_2D, a);
                    Q.g(!0, !0)
                }, reset_inputTexture: function () {
                    wb();
                    u.jb = !1;
                    Ha();
                    Ga()
                }, get_videoDevices: function (a) {
                    return S.ld(a)
                }, set_scanSettings: function (a) {
                    Ra(X, a);
                    ub();
                    tb()
                }, set_stabilizationSettings: function (a) {
                    Ra(sa, a)
                }, set_videoOrientation: function (a, c) {
                    ob() && (ha.flipX = c, ha.rotate = a, Ha(), Ga())
                }, update_videoElement: function (a, c) {
                    eb(a ? a : u.element, function () {
                        Gb();
                        Ha();
                        Ga();
                        c && c()
                    })
                }
            };
        return Kb
    };
    window.JEEFACEFILTERAPI = window.JEEFACEFILTERAPIGEN();

    return JEEFACEFILTERAPI;
})()