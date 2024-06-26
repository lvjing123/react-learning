import React from "react";
import { Avatar, List } from "antd"
import DraggableView from "@/view/DragPage/CenterPanel/DraggableView";

const data = Array.from({length: 3}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
export const ListView = (props) => {
    let {itemView, index, } = props;
    return (<DraggableView itemView={itemView} index={index} >
            <List
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta style={{paddingLeft: 10, paddingRight: 10}}
                                        avatar={<Avatar src={item.avatar}/>}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                        />
                    </List.Item>
                )}
            />
        </DraggableView>
    )
}