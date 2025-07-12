import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Camera, Plus, X } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassInput } from '../common/GlassInput';
import { SkillTag } from '../common/SkillTag';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/use-toast';

const profileSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  availability: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfileForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(user?.profile_image || null);
  const [offeredSkills, setOfferedSkills] = useState<string[]>([
    'Web Development',
    'UI/UX Design',
  ]);
  const [wantedSkills, setWantedSkills] = useState<string[]>([
    'Digital Marketing',
    'Photography',
  ]);
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');
  const [availability, setAvailability] = useState<string[]>(user?.availability || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      availability: user?.availability || [],
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this to your server
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addOfferedSkill = () => {
    if (newOfferedSkill.trim() && !offeredSkills.includes(newOfferedSkill.trim())) {
      setOfferedSkills([...offeredSkills, newOfferedSkill.trim()]);
      setNewOfferedSkill('');
    }
  };

  const addWantedSkill = () => {
    if (newWantedSkill.trim() && !wantedSkills.includes(newWantedSkill.trim())) {
      setWantedSkills([...wantedSkills, newWantedSkill.trim()]);
      setNewWantedSkill('');
    }
  };

  const removeOfferedSkill = (skill: string) => {
    setOfferedSkills(offeredSkills.filter(s => s !== skill));
  };

  const removeWantedSkill = (skill: string) => {
    setWantedSkills(wantedSkills.filter(s => s !== skill));
  };

  const toggleAvailability = (time: string) => {
    setAvailability(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // In a real app, you'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated!",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Profile Settings</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/50"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center border-4 border-white/50">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Profile Photo</h4>
              <p className="text-sm text-gray-600">
                Upload a professional photo to help others recognize you
              </p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassInput
              label="First Name"
              {...register('first_name')}
              error={errors.first_name?.message}
            />
            <GlassInput
              label="Last Name"
              {...register('last_name')}
              error={errors.last_name?.message}
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Weekdays', 'Weekends', 'Evenings', 'Mornings', 'Afternoons', 'Nights'].map((time) => (
                <label key={time} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={availability.includes(time)}
                    onChange={() => toggleAvailability(time)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{time}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skills Offered */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills You Can Teach
            </label>
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {offeredSkills.map((skill) => (
                  <SkillTag
                    key={skill}
                    skill={skill}
                    type="offered"
                    onRemove={() => removeOfferedSkill(skill)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newOfferedSkill}
                onChange={(e) => setNewOfferedSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-4 py-2 glass-input text-gray-700"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOfferedSkill())}
              />
              <GlassButton
                type="button"
                onClick={addOfferedSkill}
                className="px-4 py-2 bg-emerald-600 text-white"
              >
                <Plus className="w-4 h-4" />
              </GlassButton>
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills You Want to Learn
            </label>
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {wantedSkills.map((skill) => (
                  <SkillTag
                    key={skill}
                    skill={skill}
                    type="wanted"
                    onRemove={() => removeWantedSkill(skill)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newWantedSkill}
                onChange={(e) => setNewWantedSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-4 py-2 glass-input text-gray-700"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWantedSkill())}
              />
              <GlassButton
                type="button"
                onClick={addWantedSkill}
                className="px-4 py-2 bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4" />
              </GlassButton>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              {...register('bio')}
              rows={4}
              className="w-full px-4 py-3 glass-input text-gray-700"
              placeholder="Tell others about yourself and your experience..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <GlassButton
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
            </GlassButton>
            <GlassButton type="button" className="px-6">
              Cancel
            </GlassButton>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );
};
