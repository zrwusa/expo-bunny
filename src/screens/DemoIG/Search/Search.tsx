import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {Brick, DemoIGStackParam, MasonryDatum} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {createStyles} from "./styles";
import {FlatList, VirtualizedList} from "react-native";
import {uuid4} from "@sentry/utils";
import {useEffect, useState} from "react";
import {Masonry} from "../../../components/Masonry/Masonry";

type IGSearchRouteProp = RouteProp<DemoIGStackParam, 'IGSearch'>;
type IGSearchNavigationProp = BottomTabNavigationProp<DemoIGStackParam, 'IGSearch'>;

export interface IGSearchProps {
    route: IGSearchRouteProp,
    navigation: IGSearchNavigationProp
}


export function IGSearchScreen({route, navigation}: IGSearchProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.IGSearch');
    const sizeLabor = useSizeLabor();
    const {wp} = sizeLabor.responsive.iphoneX
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor)
    const defaultMasonryDatas: MasonryDatum[] = [
        {
            "id": "67a1c4d49f8b4080bfe84014db2f9136",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "85f6a66ec289448290b67ac33244a379",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "d8cabc41087546698b865fa5903853a3",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "6288b709fb134e53a8e814f48efaf550",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "22f94b66ce81482aaa874bd46c931198",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "f713e1959fbb4fee84e895e83f7fe86c",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "758f7ca0f1514f38a5350c60f18c3679",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "f58f2f91f4f146c89bc267b97fb4d416",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "3dd65e32f28b4e52b6b3264d86bac224",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        },
        {
            "id": "96fb9977f47b4f29ad773cea922d27ad",
            "column1": [
                {
                    "id": "e6edb442e3f24c65b4e8b38fd07fedba",
                    "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                    "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
                },
                {
                    "id": "273f92979a264775bafc42bbdf6a2d07",
                    "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                    "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
                },
                {
                    "id": "e378f21bdc3b466d8e96455d7da804b7",
                    "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                    "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
                }
            ],
            "column2": [
                {
                    "id": "1c0596ee41074bcba0428243671f6907",
                    "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                    "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
                },
                {
                    "id": "b85119c1bcea497b82d1abe90529ef1b",
                    "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                    "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
                },
                {
                    "id": "8071340725594535a8242090f0aca210",
                    "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                    "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
                }
            ],
            "column3": [
                {
                    "id": "dc140ef3ab24461c9c41eefa16633ef5",
                    "text": "Fugiat deserunt doloremque molestiae veritatis beatae aut. Eveniet voluptas sunt accusamus. Quis quos hic itaque. Eveniet est repellendus. Odit sed sint. Repellendus est et.",
                    "uri": "https://i.pinimg.com/236x/d7/fb/60/d7fb60b2321149a83ab5dbe94744ced6.jpg"
                },
                {
                    "id": "665d40f2343f4a0880e98e4d15cb2c8b",
                    "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                    "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
                },
                {
                    "id": "a82bde72ddec487390f198f0891bcec3",
                    "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                    "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
                }
            ]
        }
    ]
    const [MasonryData, setMasonryDatas] = useState(defaultMasonryDatas)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const rawBricks = [
            {
                "id": uuid4(),
                "text": "Sit qui consequuntur vel quibusdam sit ea sint. Repellendus unde ducimus sed dolor sint iste. Expedita voluptas iste adipisci eos. Impedit dignissimos ratione animi dolorem est.",
                "uri": "https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg"
            },

            {
                "id": uuid4(),
                "text": "Provident rerum fugiat qui. Soluta eos reiciendis alias rerum et sunt animi commodi. Omnis temporibus quia accusantium laudantium distinctio porro nostrum dolores voluptas. Quibusdam assumenda laudantium exercitationem ipsam. Quia repellendus ut a ea sed recusandae debitis. In velit odit alias quod est nulla maxime est reprehenderit.",
                "uri": "https://i.pinimg.com/236x/65/aa/58/65aa58f9ec28f1a889a2cce245d23110.jpg"
            },

            {
                "id": uuid4(),
                "text": "Consequatur in ipsa ab sapiente enim. Accusantium aut est voluptas sequi. Quibusdam neque aperiam dolor. Excepturi sunt a minus fuga autem excepturi cupiditate. Fuga aspernatur incidunt aliquid.",
                "uri": "https://i.pinimg.com/236x/7f/24/8c/7f248c9e18abe79de0d6c79617e03361.jpg"
            },
            {
                "id": uuid4(),
                "text": "Quas et fuga eos ducimus reprehenderit necessitatibus. Molestiae fuga maiores nobis id. Id debitis id dignissimos magni repellendus quae. Neque aut officia quia dolorem consequatur facilis esse. Ipsam et in aut est voluptatibus qui labore. Esse qui harum dolores.",
                "uri": "https://i.pinimg.com/236x/44/d4/c3/44d4c397ff1831222a32620006d3e4ae.jpg"
            },
            {
                "id": uuid4(),
                "text": "Eligendi mollitia est alias molestiae et voluptas ut natus aliquid. Dolorem autem saepe. Accusamus quae quia excepturi iure sint eum vitae. Voluptas rerum soluta rerum ex unde.",
                "uri": "https://i.pinimg.com/236x/44/cb/7f/44cb7fc19131e851f639f6e24acbdec6.jpg"
            },
            {
                "id": uuid4(),
                "text": "Aliquam laborum sit ipsam. Odit possimus culpa voluptatem.",
                "uri": "https://i.pinimg.com/236x/3d/90/bc/3d90bc862205b58b4cba9d8ccf2ada3d.jpg"
            },
            {
                "id": uuid4(),
                "text": "Veritatis eum aut officiis ut libero sed accusantium neque mollitia. Quisquam velit ratione adipisci at quos officiis nulla porro. Expedita soluta iure accusamus eius modi accusantium temporibus. Cumque omnis et. Voluptatem officiis labore molestiae nostrum numquam quia. Dolorem itaque et maiores atque beatae.",
                "uri": "https://i.pinimg.com/236x/6a/b0/d9/6ab0d93ee045cde3a25b5a0a22cd6435.jpg"
            },
            {
                "id": uuid4(),
                "text": "Magnam dolor vel reprehenderit. Tenetur perspiciatis nam rerum quo molestias eligendi itaque atque. Reprehenderit laboriosam qui ipsam dolorum hic. Aut enim odit tempore et sed saepe dignissimos. Praesentium sapiente optio aut consequatur et est. Quaerat nam enim natus consequuntur temporibus.",
                "uri": "https://i.pinimg.com/236x/0f/41/f6/0f41f6073f27a4c8baf57d26f76b4b9a.jpg"
            },
            {
                "id": uuid4(),
                "text": "Sed et rerum tenetur. Veritatis blanditiis harum aut voluptatem unde quisquam neque ab quod. Doloribus sequi adipisci at quae amet molestiae voluptatem impedit expedita. Iusto nam unde molestiae enim deserunt quos. Quasi voluptatem amet voluptatibus eius et.",
                "uri": "https://i.pinimg.com/236x/ce/87/3b/ce873bc16d0e03cf21ab687d9d3c8ced.jpg"
            },
            {
                "id": uuid4(),
                "text": "Dicta dolor dolorem repellendus perspiciatis. Voluptates ut consequatur eos quaerat laudantium. Molestias atque magnam tempora numquam molestias distinctio et maxime.",
                "uri": "https://i.pinimg.com/236x/a1/2b/ab/a12babee7999f15e09d908fb2bcbdf52.jpg"
            },
            {
                "id": uuid4(),
                "text": "Quo eos voluptas expedita incidunt. Non esse explicabo ut voluptates fugit omnis alias. Et non voluptatum repellendus in ut. Qui sunt voluptatem hic aut.",
                "uri": "https://i.pinimg.com/236x/21/c4/d3/21c4d38cd1401a12add89d309fc7940a.jpg"
            },
            {
                "id": uuid4(),
                "text": "Blanditiis hic nostrum illum culpa quia commodi molestiae ab. Sed esse enim perspiciatis quasi. Nemo maiores delectus quod. Est inventore aut.",
                "uri": "https://i.pinimg.com/236x/d8/e5/8b/d8e58b3064f8978657f9453a2d981285.jpg"
            },
            {
                "id": uuid4(),
                "text": "Et rem aut in non libero magnam tempora nihil. Iste id maiores quis ut. Qui eum eveniet consequatur saepe praesentium minus eius ad ea. Magnam et temporibus.",
                "uri": "https://i.pinimg.com/236x/a9/54/d0/a954d0c3d6d1273663688fbe1c137f43.jpg"
            },
            {
                "id": uuid4(),
                "text": "Maxime neque et aut sapiente nesciunt odio vel. Non vero officiis. Facilis occaecati similique voluptate nisi. Sit ab et autem iste enim est in. Hic sunt sapiente autem qui nostrum at iure.",
                "uri": "https://i.pinimg.com/236x/09/16/e0/0916e0231fc99916097e68ef08c6cdc0.jpg"
            },
            {
                "id": uuid4(),
                "text": "Et id impedit soluta deserunt qui laboriosam exercitationem in. Consequatur qui quae ducimus omnis laboriosam et alias.",
                "uri": "https://i.pinimg.com/236x/d1/35/a2/d135a2e4595c9c4906cd966e60b5b258.jpg"
            },
            {
                "id": uuid4(),
                "text": "Molestias dolores totam molestiae dolor esse et voluptatem iste. Ea delectus quasi.",
                "uri": "https://i.pinimg.com/236x/91/7a/bd/917abd60da8e94fd0d47c40b26ffe708.jpg"
            },
            {
                "id": uuid4(),
                "text": "Est in eius eos autem. Doloremque dignissimos ut libero non eaque voluptatibus corrupti totam. Nihil porro dolor dolores eaque rem odit. Saepe optio aut voluptatem ipsa placeat in. Vero neque ea distinctio. Consequatur veniam soluta a maiores nihil omnis deleniti.",
                "uri": "https://i.pinimg.com/236x/f0/b6/97/f0b69750e29d91d16d65ca8416ae733b.jpg"
            },
            {
                "id": uuid4(),
                "text": "Qui quisquam atque nisi ut natus inventore eos sint. Debitis vitae illo sit expedita. Minima culpa et voluptas sit labore est aut necessitatibus aliquam. Voluptatem corporis nobis qui molestiae cum quasi voluptas sapiente.",
                "uri": "https://i.pinimg.com/236x/3e/b4/3b/3eb43ba65ff82d73789efe17f578dc01.jpg"
            },
            {
                "id": uuid4(),
                "text": "Ut soluta velit. Tempore vel qui natus laboriosam voluptatem quo pariatur non. Reiciendis aut tempore dolores voluptas dolores. Assumenda est sed qui dolore nulla officia nemo aut iusto.",
                "uri": "https://i.pinimg.com/236x/11/7a/6e/117a6e2927fe1570b9adc368c56a8ec3.jpg"
            },
            {
                "id": uuid4(),
                "text": "Qui voluptatem quia officiis eaque explicabo. Iste dolor eligendi nostrum sit.",
                "uri": "https://i.pinimg.com/236x/fa/5c/10/fa5c10edc931449a4ddbfe6b9d586d2a.jpg"
            },
            {
                "id": uuid4(),
                "text": "Distinctio modi maiores velit inventore autem nihil. Sed suscipit voluptas enim numquam beatae quis sint. Ut ut saepe eum reiciendis.",
                "uri": "https://i.pinimg.com/236x/f8/5a/6b/f85a6b268ff3414bdb138646a452a694.jpg"
            },
            {
                "id": uuid4(),
                "text": "Accusantium qui natus. Corrupti dignissimos eligendi dolores. Dolorum in quos est qui.",
                "uri": "https://i.pinimg.com/236x/da/3f/83/da3f83eeb605e15eb4c1f125dc21a166.jpg"
            },
            {
                "id": uuid4(),
                "text": "Sint harum beatae sit. Eaque aut qui qui maxime ut. Saepe et quasi.",
                "uri": "https://i.pinimg.com/236x/3f/ea/d6/3fead6de23b01bc12f45e5a5516bfd51.jpg"
            },
            {
                "id": uuid4(),
                "text": "Et esse quam nostrum culpa neque id. Placeat nemo similique expedita. Quos quae quae et odit dolores.",
                "uri": "https://i.pinimg.com/236x/37/12/2e/37122e4159c30f7357c10fd10e89df33.jpg"
            },
            {
                "id": uuid4(),
                "text": "Molestias quas dolor et possimus. Laboriosam recusandae atque veniam explicabo quis cumque asperiores omnis vitae. Tempora sint illo similique. Cum aspernatur tempore eligendi harum aperiam qui et eius. Quisquam ea accusantium voluptates enim. Est culpa sed voluptatibus et inventore similique expedita.",
                "uri": "https://i.pinimg.com/236x/4b/47/9d/4b479da98b733dfdd6e77da226c574c8.jpg"
            },
            {
                "id": uuid4(),
                "text": "Voluptatem est totam aspernatur veritatis ad et incidunt qui. Rerum maxime neque officia cumque voluptatem. Ad nihil velit illum voluptatibus. Reprehenderit occaecati voluptas ut unde.",
                "uri": "https://i.pinimg.com/236x/2c/f3/18/2cf31837d7f18b6ae4f6009c6375f8bd.jpg"
            },
            {
                "id": uuid4(),
                "text": "Fugit sapiente voluptatem recusandae. Aspernatur excepturi modi. Quas dolor autem aliquid error et quae commodi quis consectetur. Rerum eos et natus aliquid quia sit est non aperiam.",
                "uri": "https://i.pinimg.com/236x/22/b8/79/22b8798fcc2d33a705ef162308fdc286.jpg"
            },
            {
                "id": uuid4(),
                "text": "Pariatur dignissimos inventore ullam nulla adipisci nostrum voluptatem voluptatibus. Eius asperiores et earum possimus optio nobis. Possimus sunt minus voluptas sed. Aut reiciendis vel sed officiis ea corrupti veritatis odit odit. Excepturi qui et laborum quia.",
                "uri": "https://i.pinimg.com/236x/d8/44/72/d844725ad8295a7f6d0d66b764ab239a.jpg"
            },
            {
                "id": uuid4(),
                "text": "Dolore labore quasi explicabo qui eum similique dignissimos voluptas. Tempore non culpa ducimus explicabo et illo perspiciatis. Eligendi dolores corrupti asperiores consectetur. Doloribus nulla debitis assumenda eos quo aliquam enim beatae aut.",
                "uri": "https://i.pinimg.com/236x/8d/c4/7b/8dc47b2bb33f302ffd1a3742223cefc2.jpg"
            },
            {
                "id": uuid4(),
                "text": "Tempora in voluptas et quasi laborum quidem corporis maiores. Fuga quia consequuntur exercitationem. Nulla beatae et sed. Veniam illo labore magni ut corporis.",
                "uri": "https://i.pinimg.com/236x/eb/78/7b/eb787b84a432329896575aecdc3b20cd.jpg"
            },
            {
                "id": uuid4(),
                "text": "Ratione et est similique autem corrupti enim dicta exercitationem consectetur. Occaecati consequatur non iure repellendus quibusdam sit voluptate ut. Quibusdam voluptate harum doloribus. Omnis esse iusto modi. Necessitatibus aut possimus vel optio quod ut quae nihil reiciendis. Qui esse reiciendis.",
                "uri": "https://i.pinimg.com/236x/f8/0d/3d/f80d3d8c4c3bed1d99a70b2ec78f74bb.jpg"
            },
            {
                "id": uuid4(),
                "text": "Tempora ad temporibus repudiandae asperiores repellendus adipisci voluptatibus est consequatur. Itaque voluptate eius. Eum voluptatibus aut nobis. Eveniet necessitatibus architecto alias ab. Animi quasi sit esse sed adipisci nihil et sint odit.",
                "uri": "https://i.pinimg.com/236x/e0/c3/0d/e0c30d9dcb626db6058220bfaf7fb7a2.jpg"
            },
            {
                "id": uuid4(),
                "text": "Doloremque aspernatur illo repudiandae. Voluptate non aliquam voluptatibus rerum eaque repellendus eius. Eligendi quia facilis non doloribus. Nesciunt officiis sed necessitatibus dolorem aut voluptas.",
                "uri": "https://i.pinimg.com/236x/b7/1a/09/b71a09aec5c36e3ac5d4919ca3b34076.jpg"
            },
            {
                "id": uuid4(),
                "text": "Nihil impedit tempora reiciendis assumenda quam rem. Nihil sed velit libero eum laudantium provident consequatur dolores consectetur. Recusandae rerum soluta pariatur officia perspiciatis numquam in. Qui a voluptatibus vero. Commodi pariatur fuga voluptatibus consequatur ullam. Beatae et tempora repudiandae at est fuga perspiciatis debitis.",
                "uri": "https://i.pinimg.com/236x/95/19/dd/9519dd364268b8943253c74c01afe5f3.jpg"
            },
            {
                "id": uuid4(),
                "text": "Quam molestiae perspiciatis impedit vitae. Sunt voluptas quidem aliquid.",
                "uri": "https://i.pinimg.com/236x/af/2e/fa/af2efa848346acbb002bf57218d22a7c.jpg"
            },
            {
                "id": uuid4(),
                "text": "Minus eum aut ipsa quas. Sed sit aut ducimus aliquam corporis praesentium omnis. Qui nemo vero voluptatem ad praesentium quia. Sed voluptas quasi qui dolorem non facere sint maxime. Cumque aut totam.",
                "uri": "https://i.pinimg.com/236x/d5/38/72/d5387228bafbfa6e0b1a05145e2dec22.jpg"
            },
            {
                "id": uuid4(),
                "text": "Atque natus tenetur necessitatibus et dolor sed rem consectetur. Temporibus beatae maiores eaque atque perferendis suscipit voluptates odit sed. Ut perferendis voluptatem. Non odio necessitatibus accusantium harum eligendi numquam molestiae deserunt omnis.",
                "uri": "https://i.pinimg.com/236x/40/b8/4a/40b84ac7bbbf974fceb039a958a9216d.jpg"
            },
            {
                "id": uuid4(),
                "text": "Aliquid delectus quae quis est possimus. Doloremque magni mollitia ad et suscipit incidunt modi. Eum placeat voluptas dolorum tempore consequuntur ea omnis voluptate. Inventore aut incidunt rerum laborum architecto enim. Ad id qui nam reiciendis in ut accusamus.",
                "uri": "https://i.pinimg.com/236x/7c/ba/43/7cba437e3769a83ea995ed2ea1fcc03f.jpg"
            },
            {
                "id": uuid4(),
                "text": "Dolores nobis ut asperiores natus vel et. Rerum non est voluptatibus placeat eum omnis magnam. Autem nostrum ut qui magni quasi expedita.",
                "uri": "https://i.pinimg.com/236x/1b/3b/c4/1b3bc49438eedf350be23a748423cbee.jpg"
            },
            {
                "id": uuid4(),
                "text": "Sit eum nobis et a culpa sint ad. Veniam maiores quasi harum sequi nisi quia perspiciatis consequatur qui. Iste natus ducimus dolorum ducimus hic aliquid unde ipsa.",
                "uri": "https://i.pinimg.com/236x/31/72/e2/3172e2cde2b9018c8830d91bee0d77a0.jpg"
            },
            {
                "id": uuid4(),
                "text": "Culpa facere architecto et est sequi ut similique id. Iure enim nesciunt ab eum reiciendis aut molestias veritatis. Voluptatem est animi facere alias reprehenderit unde ex. Eaque similique a totam odit sit ab esse. Reiciendis dolorem quasi fugit.",
                "uri": "https://i.pinimg.com/236x/dd/ca/97/ddca97ddbb7a07df82548f64be635276.jpg"
            },
            {
                "id": uuid4(),
                "text": "Facere eius quis. Earum qui quibusdam.",
                "uri": "https://i.pinimg.com/236x/85/a5/17/85a5172a45f6f80be0078ab13dbd17fd.jpg"
            },
            {
                "id": uuid4(),
                "text": "Omnis recusandae totam id dolores. Adipisci nostrum eos animi corrupti dolorum dignissimos quae. Ex minus ratione est voluptates voluptatem eaque sed enim. Ipsa rem et.",
                "uri": "https://i.pinimg.com/236x/68/d0/56/68d05619bf1f2ef0a7e8ea4f076b08d2.jpg"
            },
            {
                "id": uuid4(),
                "text": "Ab veritatis ea. Id debitis odit quos. Et velit repellat porro molestiae. Blanditiis magnam atque libero. Deserunt unde iure soluta dolores. Sunt ipsam rerum molestias id ut.",
                "uri": "https://i.pinimg.com/236x/e4/01/38/e40138e42ba1201b3f73412f526b6cb2.jpg"
            },
            {
                "id": uuid4(),
                "text": "Quia officia pariatur esse impedit. Quia et iure dolor sed fuga. Nobis harum et atque aut rerum perferendis occaecati ea odio. Odit ea quos vel laudantium impedit sit minus esse dolor.",
                "uri": "https://i.pinimg.com/236x/70/84/f6/7084f61728dd27bf1755124b560114a6.jpg"
            },
            {
                "id": uuid4(),
                "text": "Enim doloremque quo quia rerum voluptatem pariatur numquam quis. Vero et blanditiis incidunt veniam exercitationem aspernatur dolor. Mollitia et debitis qui aut quia eaque. Quis nemo sed optio odio.",
                "uri": "https://i.pinimg.com/236x/1c/11/53/1c1153c4fdad439ea7cdb90d181cda66.jpg"
            },

            {
                "id": uuid4(),
                "text": "Eveniet iure quia est modi. Consequatur harum et et eum in voluptas ipsum.",
                "uri": "https://i.pinimg.com/236x/44/2f/b4/442fb435dfe1ba7ee31c1ee771e5fa01.jpg"
            },
            {
                "id": uuid4(),
                "text": "Ad aut sint odio blanditiis blanditiis sit. Iure modi quisquam et. Qui odio labore voluptas repellat qui aut. Ut neque voluptatibus. Suscipit qui quo et cum accusantium.",
                "uri": "https://i.pinimg.com/236x/fc/87/87/fc87877e88dda802ea41c6a3cc1f75d4.jpg"
            },
            {
                "id": uuid4(),
                "text": "Sed nisi odio. Temporibus reprehenderit officiis nemo.",
                "uri": "https://i.pinimg.com/236x/46/99/c8/4699c803a6577db55ffc7726c3a0bdb5.jpg"
            },

        ];
        let column1 = [],
            column2 = [],
            column3 = [];

        let manyBricks: Brick[] = []

        for (let i = 0; i < 1; i++) {
            manyBricks = manyBricks.concat(rawBricks.map(brick => {
                brick.id = uuid4()
                return brick
            }))
        }

        let i = 0;
        while (i < manyBricks.length) {
            column1.push(manyBricks[i++]);
            if (i < manyBricks.length) {
                column2.push(manyBricks[i++]);
            }
            if (i < manyBricks.length) {
                column3.push(manyBricks[i++]);
            }
        }
        let newMasonryData: MasonryDatum[] = []
        for (let i = 0; i < 100; i++) {
            newMasonryData.push({id: uuid4(), column1, column2, column3})
        }
        setMasonryDatas(newMasonryData)
        setIsReady(true)
    }, [])

    const imageWidth = wp(375 / 3 - 1);

    const getItem = function (data: [], index: number) {
        return data[index]
    }

    const getItemCount = function (data: []) {
        return data.length;
    }
    return (
        isReady ?
            <FlatList data={MasonryData}
                      initialNumToRender={1}
                      renderItem={({item}) => <Masonry data={item}/>}
                      keyExtractor={item => item.id}
            />
            : null
        // <VirtualizedList
        //     data={MasonryData}
        //     initialNumToRender={1}
        //     renderItem={({item}) => <Masonry item={item}/>}
        //     keyExtractor={item => item.id}
        //     getItemCount={getItemCount}
        //     getItem={getItem}
        //     removeClippedSubviews={true}
        //     maxToRenderPerBatch={1}
        //     updateCellsBatchingPeriod={1}
        // />
    );
}
