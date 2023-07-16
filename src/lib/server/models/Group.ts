import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema(
  {
    number: {
      type: Number,
      required: true
    },
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Students'
        }
      ],
      required: true,
      default: []
    },
    color: {
      type: String,
      required: false,
      // default is a random hex color
      default: '#' + Math.floor(Math.random() * 0xffffff).toString(16)
    }
  },
  {
    statics: {
      getPojoGroups: async function () {
        return (await Group.find().populate('members'))
          .map((x) => x.toObject())
          .map((x) => ({ ...x, _id: x._id.toString() }))
          .map((x) => ({
            ...x,
            members: x.members.map((y) => ({
              ...y,
              id: y._id.toString(),
              _id: y._id.toString(),
              telegram: { ...y.telegram, _id: y.telegram._id.toString() }
            }))
          }));
      },
      findMaxNumber: async function () {
        const groups = await this.find();
        return groups.reduce((max, group) => (group.number > max ? group.number : max), 0);
      },
      generate: async function (n: number) {
        const groups = [];
        const start = await this.findMaxNumber();
        for (let i = 1; i <= n; i++) {
          groups.push({
            number: start + i,
            color:
              '#' +
              Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, '0')
          });
        }
        return (await this.insertMany(groups))
          .map((x) => x.toObject())
          .map((x) => ({ ...x, _id: x._id.toString() }));
      }
    }
  }
);

const Group = mongoose.model('Group', GroupSchema, 'Groups', { overwriteModels: true });
export default Group;
