// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import Model, {Associations} from '@nozbe/watermelondb/Model';
import {field, relation} from '@nozbe/watermelondb/decorators';

import {MM_TABLES} from '@constants/database';
import Channel from '@typings/database/channel';

const {CHANNEL, MY_CHANNEL} = MM_TABLES.SERVER;

/**
 * MyChannel is an extension of the Channel model but it lists only the Channels the app's user belongs to
 */
export default class MyChannel extends Model {
    /** table (entity name) : MyChannel */
    static table = MY_CHANNEL

    /** associations : Describes every relationship to this entity. */
    static associations: Associations = {
        [CHANNEL]: {type: 'belongs_to', key: 'channel_id'},
    }

    /** channel_id : The foreign key to the related Channel record  */
    @field('channel_id') channelId!: string

    /** last_post_at : the timestamp for any last post on this channel */
    @field('last_post_at') lastPostAt!: number

    /** last_viewed_at : timestamp showing the user's last viewed post on this channel */
    @field('last_viewed_at') lastViewedAt!: number

    /** mentionsCount : The number of mentions on this channel */
    @field('mentions_count') mentionsCount!: number

    /** messageCount : The derived number of unread messages on this channel */
    @field('message_count') messageCount!: number

    /** roles : The user's privileges on this channel */
    @field('roles') roles!: string

    /** channel : The related parent record to the Channel model */
    @relation(CHANNEL, 'channel_id') channel!: Channel
}

// FIXME : create a 1:1 relationship between MyChannel and Channel