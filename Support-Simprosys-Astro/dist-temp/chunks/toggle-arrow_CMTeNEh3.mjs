const ToggleArrow = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/toggle-arrow.CXd9_KZ4.png","width":24,"height":24,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/toggle-arrow.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/toggle-arrow.png");
							return target[name];
						}
					});

export { ToggleArrow as T };
